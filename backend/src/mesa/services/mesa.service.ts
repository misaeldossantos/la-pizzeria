import { Mesa } from './../model/mesa.entity';
import { Service } from '@tsed/di';

@Service()
export class MesaService {

     async indisponibilizarMesa(mesa: Mesa) {
          mesa.disponivel = false
          await mesa.save()
     }

     async disponibilizarMesa(mesa: Mesa) {
          console.log(mesa)
          mesa.disponivel = true
          await mesa.save()
     }

}