import { Column } from "typeorm";
import { FormaPagamentoEnum } from "./forma-pagamento-enum";
import { ManyToOne } from "typeorm";
import { JoinColumn } from "typeorm";
import { Comanda } from "./../../comanda/model/comanda.entity";
import { Bean } from "./../../core/model/bean.entity";
import { Entity } from "typeorm";
import { Property, Enum } from "@tsed/schema";

@Entity("pagamentos")
export class Pagamento extends Bean {
  @Property()
  @ManyToOne(() => Comanda, { lazy: true })
  @JoinColumn({ name: "comanda_id" })
  comanda: Comanda;

  @Property()
  @Column({ type: "enum", enum: FormaPagamentoEnum, name: "forma_pagamento" })
  @Enum(FormaPagamentoEnum)
  formaPagamento: FormaPagamentoEnum;

  @Property()
  @Column({name: "valor_pago"})
  valorPago: number;

  @Property()
  @Column()
  desconto: number;

  @Property()
  @Column({ name: "data_hora", type: "datetime" })
  dataHora: Date;
}
