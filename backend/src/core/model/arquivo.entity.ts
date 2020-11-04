import { Column, Entity } from "typeorm";
import { Bean } from "./bean.entity";

@Entity("arquivos")
export class Arquivo extends Bean {
  @Column()
  nome: string;

  @Column({ type: "longblob", nullable: true })
  bytes: Buffer;
}
