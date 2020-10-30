
export enum NivelAcessoEnum {
  GARCOM = "GARCOM",
  COZINHEIRO = "COZINHEIRO",
  ADMINISTRADOR = "ADMINISTRADOR"
}

export const nivelAcessoOptions = [{
  label: "Garçom",
  value: NivelAcessoEnum.GARCOM
}, {
  label: "Cozinheiro",
  value: NivelAcessoEnum.COZINHEIRO
}, {
  label: "Administrador",
  value: NivelAcessoEnum.ADMINISTRADOR
}]

export class Usuario {
  id?: number;
  nome: string = ""
  email: string = ""
  senha: string = ""
  nivelAcesso: NivelAcessoEnum
}
