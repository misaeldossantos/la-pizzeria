import { Usuario } from './../model/Usuario';
import { httpRequest } from './HttpService';

export default {
  async save(usuario: Usuario) {
    const {data} = await httpRequest.post("/api/usuarios", usuario)
    return data
  }
}
