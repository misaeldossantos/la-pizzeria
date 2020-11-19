import { httpRequest } from './HttpService';

export default {
  async login({ email, senha }) {
    const { data } = await httpRequest.post("/api/auth/login", {email, senha})
    return data
  },
  async getPerfil() {
    const { data } = await httpRequest.get("/api/auth/perfil")
    return data
  }
}
