import { ItemObservacao } from './item-observacao.entity';
import { Property } from '@tsed/schema';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique} from 'typeorm';
import { Bean } from '../../core/model/bean.entity';
import { Produto } from './../../produtos/model/produto.entity';
import { Comanda } from './comanda.entity';

@Entity("comandas_itens")
@Unique("item_produto_comanda", ["produto.id", "comanda.id"])
export class ComandaItem extends Bean {

     @Property()
     @ManyToOne(() => Comanda, {onDelete: 'CASCADE'})
     @JoinColumn({name: 'comanda_id'})
     comanda: Comanda;

     @Property()
     @ManyToOne(() => Produto)
     @JoinColumn({name: 'produto_id'})
     produto: Produto;
     
     @Property()
     @Column()
     quantidade: number;

     @Property()
     @OneToMany(() => ItemObservacao, observacao => observacao.item, {lazy: true, cascade: true})
     observacoes: ItemObservacao[];
     
}