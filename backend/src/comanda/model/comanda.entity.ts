import { Enum, Property } from '@tsed/schema';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Bean } from '../../core/model/bean.entity';
import { Mesa } from './../../mesa/model/mesa.entity';
import { Usuario } from './../../usuario/model/usuario.entity';
import { ComandaItem } from './comanda-item.entity';
import { StatusComandaEnum } from "./status-comanda-enum";
@Entity("comandas")
export class Comanda extends Bean {

     @Property()
     @ManyToOne(() => Mesa, { onDelete: "CASCADE", cascade: true })
     @JoinColumn({name: 'mesa_id'})
     mesa: Mesa;

     @Property()
     @ManyToOne(() => Usuario, { onDelete: "CASCADE", cascade: true })
     @JoinColumn({name: 'garcon_id'})
     garcom: Usuario;
     
     @Property()
     @Column({ name: "para_viagem"})
     paraViagem: boolean;

     @Property()
     @Column({enum: StatusComandaEnum, type: "enum", name: "status"})
     @Enum(StatusComandaEnum)
     status: StatusComandaEnum;

     @Property()
     @Column({ name: "valor_total" })
     valorTotal: number;

     @Property()
     @OneToMany(() => ComandaItem, item => item.comanda, {lazy: true, onDelete: 'CASCADE', cascade: true})
     itens: ComandaItem[];

}