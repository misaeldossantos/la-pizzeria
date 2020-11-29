import { ComandaItem } from "./../model/comanda-item.entity";
import { Comanda } from "./../model/comanda.entity";
import { Service } from "@tsed/di";

@Service()
export class ComandaService {
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
        .setParameters({id: idComanda})
        .execute();
    } catch (e) {
         console.log(e)
    }
  }
}
