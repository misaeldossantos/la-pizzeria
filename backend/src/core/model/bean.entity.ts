import { Property } from '@tsed/schema';
import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class Bean extends BaseEntity {
     
     @Property()
     @PrimaryGeneratedColumn()
     id?: number;

     get isNew() {
          return !this.id;
     }
}