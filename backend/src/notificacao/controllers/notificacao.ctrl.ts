import { ThreadLocal } from './../../core/services/ThreadLocal';
import { NotificacaoService } from './../notificacao.service';
import { Delete, Get, Inject, PathParams } from '@tsed/common';
import { Controller } from '@tsed/common';
import { CustomAuth } from '../../core/auth/CustomAuth';
import { NivelAcessoEnum } from '../../usuario/model/nivel-acesso-enum';

@Controller("/notificacoes")
export class NotificacaoCtrl {

     @Inject(NotificacaoService)
     notificacaoService: NotificacaoService;

     @Inject(ThreadLocal)
     threadLocal: ThreadLocal;

     @Get("/")
     @CustomAuth({niveisAcesso: []})
     async getNotificacoes() {
          const usuarioId = this.threadLocal.getUsuarioId()
          return this.notificacaoService.getNotificacoesGarcom(usuarioId)
     }

     @Delete("/:id")
     @CustomAuth({niveisAcesso: []})
     async removerNotificacao(@PathParams("id") id: string) {
          this.notificacaoService.removerNotificacao(id)
     }

}