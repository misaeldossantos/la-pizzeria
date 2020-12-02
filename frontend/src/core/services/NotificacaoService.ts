import { httpRequest } from "./HttpService";

export default {
  async getNotificacoes() {
    const { data } = await httpRequest.get("/api/notificacoes");
    return data;
  },
  async remove(id) {
    await httpRequest.delete(`/api/notificacoes/${id}`);
  }
};
