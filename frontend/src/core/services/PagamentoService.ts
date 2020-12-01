import { httpRequest } from "./HttpService";

export default {
  async gerarPagamento(base) {
    const {data} = await httpRequest.post("/api/pagamentos/gerar", base)
    return data
  },
  async finalizar(id) {
    const {data} = await httpRequest.post(`/api/pagamentos/${id}/finalizar`)
    return data
  },
};
