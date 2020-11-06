import { Column, Entity } from "typeorm";
import { Bean } from "../../core/model/bean.entity";

@Entity("arquivos")
export class Arquivo extends Bean {
  @Column()
  nome: string;

  @Column()
  mimeType: string;

  @Column({ type: "longblob", nullable: true })
  buffer: Buffer;
}
