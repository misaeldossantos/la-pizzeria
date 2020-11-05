import { Usuario } from './../model/Usuario';
import { httpRequest } from './HttpService';

export default {
  async save(usuario: Usuario) {
    const {data} = await httpRequest.post("/api/usuarios", usuario)
    return data
  },
  async list({ q, rpp, page }) {
    const {data} = await httpRequest.get("/api/usuarios", {
      params: {
        q, rpp, page
      }
    })
    return data
  },
  async delete(id) {
    await httpRequest.delete(`/api/usuarios/${id}`)
  },
  async get(id) {
    const {data} = await httpRequest.get(`/api/usuarios/${id}`)
    return data
  }
}
