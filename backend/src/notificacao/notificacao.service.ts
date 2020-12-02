import { Usuario } from './../usuario/model/usuario.entity';
import { Service } from '@tsed/di';
import * as uuid from 'uuid'

@Service()
export class NotificacaoService {
     private notificacoes: any = []

     notificaGarcom(garcom: Usuario, mensagens: string[]) {
          for(let mensagem of mensagens) {
               console.log({
                    id: uuid.v4(),
                    garcom,
                    mensagem
               })
               this.notificacoes.push({
                    id: uuid.v4(),
                    garcom,
                    mensagem
               })
          }
     }

     getNotificacoesGarcom(garcomId: number) {
          return this.notificacoes.filter((n: any) => n.garcom.id === garcomId)
     }

     removerNotificacao(id: string) {
          this.notificacoes = this.notificacoes.filter((n: any) => n.id !== id)
     }
}