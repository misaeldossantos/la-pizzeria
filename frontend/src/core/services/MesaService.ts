import { Mesa } from './../model/Mesa';
import { httpRequest } from './HttpService';

export default {
  async save(mesa: Mesa) {
    const {data} = await httpRequest.post("/api/mesas", mesa)
    return data
  },
  async list({ disponivel, q, rpp, page }) {
    const {data} = await httpRequest.get("/api/mesas", {
      params: {
        q, rpp, page, disponivel
      }
    })
    return data
  },
  async delete(id) {
    await httpRequest.delete(`/api/mesas/${id}`)
  },
  async get(id) {
    const {data} = await httpRequest.get(`/api/mesas/${id}`)
    return data
  },
  async gerarIntervalo(intervalo) {
    const {data} = await httpRequest.post(`/api/mesas/intervalo`, intervalo)
    return data
  },
  async getComandaByMesa(numero) {
    const {data} = await httpRequest.get(`/api/mesas/numero/${numero}/comanda`)
    return data
  }
}
