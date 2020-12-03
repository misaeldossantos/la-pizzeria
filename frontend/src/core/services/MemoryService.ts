import NotificacaoService from "./NotificacaoService";
import {observable} from 'mobx';
import { NivelAcessoEnum, Usuario } from "../model/Usuario";
import AuthService from "./AuthService";

const service: any = observable({
  usuario: null,
  notificacoes: [],
  async loadUsuario() {
    service.usuario = await AuthService.getPerfil();
  },
  get nivelAcesso() {
    return service.usuario?.nivelAcesso
  },
  get isGarcom() {
    return service.nivelAcesso === NivelAcessoEnum.GARCOM
  },
  get isAdm() {
    return service.nivelAcesso === NivelAcessoEnum.ADMINISTRADOR
  },
  get isCozinheiro() {
    return service.nivelAcesso === NivelAcessoEnum.COZINHEIRO
  },
  async loadNotificacoes() {
    try {
      service.notificacoes = await NotificacaoService.getNotificacoes();
    } catch (e) {
      console.log(e);
    }
  }

});


setInterval(() => {
  if(service.nivelAcesso === 'GARCOM') {
    service.loadNotificacoes();
  }
}, 4000);

export default service;
