import { Mesa } from './../../mesa/model/mesa.entity';

import { Comanda } from './../../comanda/model/comanda.entity';
import { MesaService } from '../../mesa/services/mesa.service';
import { StatusComandaEnum } from '../../comanda/model/status-comanda-enum';
import { BadRequest } from '@tsed/exceptions';
import { Pagamento } from '../model/pagamento.entity';
import { PagamentoService } from '../services/pagamento.service';
import { Inject, PathParams, QueryParams } from '@tsed/common';
import { BodyParams } from '@tsed/common';
import { Controller, Post } from '@tsed/common';
import { BasePagamento } from '../model/base-pagamento';

@Controller("/pagamentos")
export class PagamentoCtrl {

     @Inject(PagamentoService)
     pagamentoService: PagamentoService;

     @Inject(MesaService)
     mesaService: MesaService;

     // TODO: rota de finalização, disponibizar a mesa novamente

     // ETAPA 1
     @Post("/gerar")
     async gerarPagamento(
          @BodyParams() basePagamento: BasePagamento
     ) {
          return await this.pagamentoService.geraPagamento(basePagamento)
     }

     // ETAPA 2
     @Post("/:id/finalizar")
     async finalizar(@PathParams("id") id: number, @QueryParams("mesaId") mesaId: number) {
          const pagamento = await Pagamento.findOne({ id })
          
          if(!pagamento) {
               throw new BadRequest("Pagamento não existe!")
          }

          const comanda = (await pagamento.comanda)
          comanda.status = StatusComandaEnum.PAGO
          await comanda.save()
          console.log(comanda.mesa)

          await this.mesaService.disponibilizarMesa(await Mesa.findOneOrFail({id: mesaId}))
          pagamento.dataHora = new Date()

          return await pagamento.save()
     }


}