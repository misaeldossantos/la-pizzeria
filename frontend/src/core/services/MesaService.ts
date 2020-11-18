import { Mesa } from './../model/Mesa';
import { httpRequest } from './HttpService';

export default {
  async save(mesa: Mesa) {
    const {data} = await httpRequest.post("/api/mesas", mesa)
    return data
  },
  async list({ q, rpp, page }) {
    const {data} = await httpRequest.get("/api/mesas", {
      params: {
        q, rpp, page
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
  }
}
