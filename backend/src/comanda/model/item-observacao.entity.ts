import { Ingrediente } from './../../produtos/model/ingrediente.entity';
import { ComandaItem } from './comanda-item.entity';
import { Property } from '@tsed/schema';
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Bean } from '../../core/model/bean.entity';
import { Produto } from './../../produtos/model/produto.entity';
import { Comanda } from './comanda.entity';
@Entity("comandas_itens_observacoes")
export class ItemObservacao extends Bean {

     @Property()
     @ManyToOne(() => ComandaItem, {onDelete: "CASCADE"})
     @JoinColumn({name: 'comanda_item_id'})
     item: ComandaItem;

     @Property()
     @ManyToOne(() => Ingrediente)
     @JoinColumn({name: 'ingrediente_id'})
     ingrediente: Ingrediente;
     
     @Property()
     @Column()
     incluido: boolean;

}