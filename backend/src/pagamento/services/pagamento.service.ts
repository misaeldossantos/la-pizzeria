import { Pagamento } from './../model/pagamento.entity';
import { BadRequest } from "@tsed/exceptions";
import { FormaPagamentoEnum } from "./../model/forma-pagamento-enum";
import { Comanda } from "./../../comanda/model/comanda.entity";
import { Service } from "@tsed/di";
import { StatusComandaEnum } from '../../comanda/model/status-comanda-enum';
import { BasePagamento } from '../model/base-pagamento';
import {LocalDate} from 'js-joda'

function getValorPercentual(valor: number, percentual: number) {
  return (valor * percentual) / 100;
}

function formatMoney(value: number) {
  return (value.toLocaleString as any)("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' });
}


@Service()
export class PagamentoService {
  private VALOR_MINIMO_DESCONTO_GERAL = 50;
  private PERC_DESCONTO_GERAL = 10;
  private PERC_DESCONTO_ANIVERSARIANTE = 50;
  private PERC_DESCONTO_A_VISTA = 5;

  async geraPagamento(base: BasePagamento) {
    const {
      formaPagamento,
    } = base

    base.comanda = await Comanda.findOneOrFail({id: base.comanda.id})

    const {comanda} = base

    if(comanda.status !== StatusComandaEnum.FINALIZADO) {
      throw new BadRequest("Finalize a comanda primeiro!")
    }

    const pagamento = new Pagamento()
    pagamento.comanda = comanda
    const valores = this.calculaValores(base)
    pagamento.valorPago = valores.valorTotal
    pagamento.dataHora = new Date()
    pagamento.desconto = valores.totalDesconto
    pagamento.formaPagamento = formaPagamento
    const pagamentoSalvo = await pagamento.save()
    return {
      pagamento: pagamentoSalvo,
      valores
    }
  }

  calculaValores({
    comanda,
    valorPago,
    formaPagamento,
    dataNascimento,
  }: BasePagamento) {
    // REGRAS DE NEGÓCIO
    let totalPercDesconto = 0;
    let totalDesconto = 0;
    let troco = 0;
    let descontos: any = [];

    if (comanda.valorTotal > this.VALOR_MINIMO_DESCONTO_GERAL) {
      totalPercDesconto += this.PERC_DESCONTO_GERAL;
      descontos.push(`Aplicado ${this.PERC_DESCONTO_GERAL}% de desconto, pois valor é maior que ${formatMoney(this.VALOR_MINIMO_DESCONTO_GERAL)}`)
    }

    if (formaPagamento === FormaPagamentoEnum.DINHEIRO) {
      totalPercDesconto += this.PERC_DESCONTO_A_VISTA;
      descontos.push(`Aplicado ${this.PERC_DESCONTO_A_VISTA}% de desconto para pagamento em dinheiro`)
    }

    if(dataNascimento) {
      const today = LocalDate.now()
      const dataNascimentoDate = LocalDate.parse(dataNascimento)
      
      if ((dataNascimentoDate.dayOfMonth() === today.dayOfMonth()) && (dataNascimentoDate.month() === today.month())) {
        totalPercDesconto += this.PERC_DESCONTO_ANIVERSARIANTE;
        descontos.push(`Aplicado ${this.PERC_DESCONTO_ANIVERSARIANTE}% de desconto ao aniversariante`)
      }
    }

    totalDesconto = getValorPercentual(comanda.valorTotal, totalPercDesconto);

    const valorTotal = comanda.valorTotal - totalDesconto

    if (formaPagamento === FormaPagamentoEnum.DINHEIRO) {
      if (valorPago > valorTotal) {
        troco = valorPago - valorTotal;
      } else {
        throw new BadRequest("Valor pago é menor que o valor da comanda");
      }
    }

    return {
      totalDesconto,
      totalPercDesconto,
      valorTotal,
      descontos,
      troco,
    };
  }
}
