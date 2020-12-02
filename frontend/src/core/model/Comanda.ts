import { Usuario } from './Usuario';
import { Mesa } from './Mesa';

export enum StatusComandaEnum {
  ABERTO = "ABERTO",
  FINALIZADO = "FINALIZADO",
  PAGO = "PAGO"
}

export const statusComandaLabels = {
  [StatusComandaEnum.ABERTO]: "Aberto",
  [StatusComandaEnum.FINALIZADO]: "Finalizado",
  [StatusComandaEnum.PAGO]: "Pago"
}

export const statusComandaOptions = [{
  label: "Aberto",
  value: StatusComandaEnum.ABERTO
},  {
  label: "Finalizado",
  value: StatusComandaEnum.FINALIZADO
}, {
  label: "Pago",
  value: StatusComandaEnum.PAGO
}]

export class Comanda {
  id?: number;
  mesa: Mesa;
  garcom: Usuario;
  paraViagem: boolean = false;
  status: StatusComandaEnum;
  valorTotal: number = 0.00
}
