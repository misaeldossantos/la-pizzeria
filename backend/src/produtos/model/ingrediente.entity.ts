import { Property } from "@tsed/schema";
import { Produto } from "./produto.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Bean } from "./../../core/model/bean.entity";

@Entity("ingredientes")
export class Ingrediente extends Bean {
  @Property()
  @Column()
  descricao: string;

  @Property()
  @ManyToOne(() => Produto, { lazy: true, onDelete: "CASCADE" })
  @JoinColumn({name: "produto_id"})
  produto: Produto;
}
