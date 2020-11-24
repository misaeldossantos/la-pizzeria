import { Comanda } from './../model/Comanda';
import { httpRequest } from './HttpService';

export default {
  async save(comanda: Comanda) {
    const {data} = await httpRequest.post("/api/comandas", comanda)
    return data
  },
  async list({ q, rpp, page }) {
    const {data} = await httpRequest.get("/api/comandas", {
      params: {
        q, rpp, page
      }
    })
    return data
  },
  async delete(id) {
    await httpRequest.delete(`/api/comandas/${id}`)
  },
  async get(id) {
    const {data} = await httpRequest.get(`/api/comandas/${id}`)
    return data
  }
}
