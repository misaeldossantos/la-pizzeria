import { Property } from "@tsed/schema";
import { Comanda } from "./../../comanda/model/comanda.entity";
import { FormaPagamentoEnum } from "./forma-pagamento-enum";

export class BasePagamento {
  @Property()
  comanda: Comanda;

  @Property()
  valorPago: number;

  @Property()
  formaPagamento: FormaPagamentoEnum;

  @Property()
  dataNascimento: string;
}
