import { CategoriaEnum } from "./categoria-enum";
import { UnidadeMedidaEnum } from "./unidade-medida-enum";
import { Property, Enum, Allow } from "@tsed/schema";
import { Column, JoinColumn, ManyToOne, Entity, OneToMany } from "typeorm";
import { Bean } from "../../core/model/bean.entity";
import { Arquivo } from "../../arquivos/model/arquivo.entity";
import { Ingrediente } from "./ingrediente.entity";
import {ColumnNumericTransformer} from '../../core/utils/transformer';

@Entity("produtos")
export class Produto extends Bean {
  @Property()
  @Column()
  descricao: string;

  @Property()
  @Column({ enum: UnidadeMedidaEnum, type: "enum", name: "unidade_medida" })
  @Enum(UnidadeMedidaEnum)
  unidadeMedida: UnidadeMedidaEnum;

  @Property()
  @Column("numeric", { precision: 10, scale: 4, transformer: new ColumnNumericTransformer() })
  quantidadeUnidade: number;

  @Property()
  @Column("decimal", { precision: 10, scale: 4, transformer: new ColumnNumericTransformer() })
  preco: number;

  @Property()
  @Column({ enum: CategoriaEnum, type: "enum", name: "categoria_enum" })
  @Enum(CategoriaEnum)
  categoria: CategoriaEnum;

  @Allow(null)
  @Property()
  @ManyToOne(() => Arquivo, { lazy: true, onDelete: "CASCADE", cascade: true })
  @JoinColumn({ name: "foto_id" })
  foto?: Arquivo;

  @Property()
  @OneToMany(() => Ingrediente, (ingrediente) => ingrediente.produto, {
    lazy: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  ingredientes: Ingrediente[];

  @Property()
  fotoUrl: string
}
