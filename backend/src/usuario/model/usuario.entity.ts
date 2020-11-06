import { Arquivo } from '../../arquivos/model/arquivo.entity';
import { Column, Entity, ManyToOne } from "typeorm";
import { Bean } from '../../core/model/bean.entity';
import { NivelAcessoEnum } from "./nivel-acesso-enum";
import { Allow, Email, Enum, Ignore, Property } from '@tsed/schema';

@Entity("usuarios")
export class Usuario extends Bean {

     @Property()
     @Column()
     nome: string;

     @Property()
     @Column({ unique: true })
     @Email()
     email: string;

     @Property()
     @Column({enum: NivelAcessoEnum, type: "enum", name: "nivel_acesso"})
     @Enum(NivelAcessoEnum)
     nivelAcesso: NivelAcessoEnum;

     @Ignore()
     @Column()
     senha: string;

     @Allow(null)
     @Property()
     @ManyToOne(() => Arquivo, { onDelete: "CASCADE", cascade: true })
     foto?: Arquivo;
     
}