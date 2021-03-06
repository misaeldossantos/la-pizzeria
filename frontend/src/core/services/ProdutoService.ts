import { Produto } from './../model/Produto';
import { httpRequest } from './HttpService';

export default {
  async save(produto: Produto) {
    const {data} = await httpRequest.post("/api/produtos", produto)
    return data
  },
  async list({ q, rpp, page, categoria, relations }: any = {}) {
    const {data} = await httpRequest.get("/api/produtos", {
      params: {
        q, rpp, page, categoria, relations
      }
    })
    return data
  },
  async delete(id) {
    await httpRequest.delete(`/api/produtos/${id}`)
  },
  async get(id) {
    const {data} = await httpRequest.get(`/api/produtos/${id}`)
    return data
  },

  async getIngredientesItem(id) {
    const {data} = await httpRequest.get(`/api/produtos/${id}/ingredientes`)
    return data
  }
}
