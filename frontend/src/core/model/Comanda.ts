
export enum StatusComandaEnum {
  ABERTO = "ABERTO",
  AGUARDANDO = "AGUARDANDO ENTREGA",
  ENTREGUE = "ENTREGUE",
  PAGO = "PAGO"
}

export const statusComandaLabels = {
  [StatusComandaEnum.ABERTO]: "Aberto",
  [StatusComandaEnum.AGUARDANDO]: "Aguardando entrega",
  [StatusComandaEnum.ENTREGUE]: "Entregue",
  [StatusComandaEnum.PAGO]: "Pago"
}

export const statusComandaOptions = [{
  label: "Aberto",
  value: StatusComandaEnum.ABERTO
}, {
  label: "Aguardando entrega",
  value: StatusComandaEnum.AGUARDANDO
}, {
  label: "Entregue",
  value: StatusComandaEnum.ENTREGUE
}, {
  label: "Pago",
  value: StatusComandaEnum.PAGO
}]

export class Comanda {
  id?: number;
  mesa_id: number;
  para_viagem: boolean;
  status: StatusComandaEnum;
  valor_total: number = 0.00
}
