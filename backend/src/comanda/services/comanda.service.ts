import { Inject } from "@tsed/common";
import { ComandaItem } from "./../model/comanda-item.entity";
import { Comanda } from "./../model/comanda.entity";
import { Service } from "@tsed/di";
import { In } from "typeorm";
import { NotificacaoService } from "../../notificacao/notificacao.service";

@Service()
export class ComandaService {
  @Inject(NotificacaoService)
  notificacaoService: NotificacaoService;

  async atualizaValorTotal(idComanda: number) {
    try {
      await Comanda.createQueryBuilder("comanda")
        .update(Comanda)
        .set({
          valorTotal: () =>
            `(${ComandaItem.createQueryBuilder("item")
              .select("sum(item.quantidade * produto.preco)")
              .innerJoin("produtos", "produto", "produto.id = item.produto.id")
              .where("item.comanda.id = :id")
              .getSql()})`,
        })
        .where("id = :id")
        .setParameters({ id: idComanda })
        .execute();
    } catch (e) {
      console.log(e);
    }
  }

  async notificar(idComanda: number, ids: number[]) {
    const comanda = await Comanda.findOneOrFail({
      where: { id: idComanda },
      relations: ["garcom", "mesa"],
    });
    const itens = await ComandaItem.find({
      where: { id: In(ids) },
      relations: ["produto"],
    });
    this.notificacaoService.notificaGarcom(
      await comanda.garcom,
      itens.map(
        (item) =>
          `Item <b>${item.produto.descricao}</b> pronto para entrega na mesa ${comanda.mesa.numero}`
      )
    );
  }
}
