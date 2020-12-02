import { httpRequest } from "./HttpService";

export default {
  async gerarPagamento(base) {
    const {data} = await httpRequest.post("/api/pagamentos/gerar", base)
    return data
  },
  async finalizar(id, mesaId) {
    const {data} = await httpRequest.post(`/api/pagamentos/${id}/finalizar`, null, {
      params: {mesaId}
    })
    return data
  },
};
