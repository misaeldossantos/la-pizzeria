import NotificacaoService from "./NotificacaoService";
import {observable} from 'mobx';
import { Usuario } from "../model/Usuario";

const service: { notificacoes: any[], usuario: Usuario } = observable({
  usuario: null,
  notificacoes: []
});

async function loadNotificacoes() {
  try {
    service.notificacoes = await NotificacaoService.getNotificacoes();
  } catch (e) {
    console.log(e);
  }
}

setInterval(() => {
  // TODO: verificar se usuário é garçom
  loadNotificacoes();
}, 4000);

export default service;
