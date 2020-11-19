import { Bean } from './../../core/model/bean.entity';
import { Property } from '@tsed/schema';
import { Column, Entity } from 'typeorm';

@Entity("mesas")
export class Mesa extends Bean {

     @Property()
     @Column({ unique: true })
     numero: number;

     @Property()
     @Column()
     disponivel?: boolean;
     
}