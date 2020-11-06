import { httpRequest } from './HttpService';

export default {
  async upload (arquivo) {
    const formData = new FormData()
    formData.append('file', arquivo)
    const { data } = await httpRequest.post('/api/arquivos/upload', formData)
    return data
  }

}
