import { Usuario } from './../../usuario/model/usuario.entity';
import { Mesa } from './../../mesa/model/mesa.entity';
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Bean } from '../../core/model/bean.entity';
import { StatusComandaEnum } from "./status-comanda-enum";
import { Allow, Email, Enum, Ignore, Property } from '@tsed/schema';

const config = require("../../config/config.json")

@Entity("comandas")
export class Comanda extends Bean {

     @Property()
     @ManyToOne(() => Mesa, { lazy: true, onDelete: "CASCADE", cascade: true })
     @JoinColumn({name: 'mesa_id'})
     mesa: Mesa;

     @Property()
     @ManyToOne(() => Usuario, { lazy: true, onDelete: "CASCADE", cascade: true })
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

}