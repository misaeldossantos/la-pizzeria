import { Comanda } from './../model/Comanda';
import { httpRequest } from './HttpService';

export default {
  async save(comanda: Partial<Comanda> | Comanda) {
    const {data} = await httpRequest.post("/api/comandas", comanda)
    return data
  },
  async list({ q, rpp, page, status = null }) {
    const {data} = await httpRequest.get("/api/comandas", {
      params: {
        q, rpp, page, status
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
  },
  async listItens(id) {
    const {data} = await httpRequest.get(`/api/comandas/${id}/itens`)
    return data
  },
  async saveItem(idComanda, item) {
    const {data} = await httpRequest.post(`/api/comandas/${idComanda}/itens`, item)
    return data
  },
  async deleteItem(idComanda, idItem) {
    const {data} = await httpRequest.delete(`/api/comandas/${idComanda}/itens/${idItem}`)
    return data
  }
}
