import axios from "axios";
import { Notify } from "quasar";

export const httpRequest = axios.create({
  baseURL: "http://localhost:8083"
});

httpRequest.interceptors.request.use((request) => {
  if(!request.headers) {
    request.headers = {}
  }
  request.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`
  return request
})

httpRequest.interceptors.response.use(
  response => {
    if (response.data.message) {
      Notify.create({
        color: "positive",
        message: response.data.message,
        position: "top"
      });
    }
    return response;
  },
  error => {
    let message = error.response.data.message
    if(error.response.status === 401) {
      message = "Você não tem acesso a este recurso."
    }

    Notify.create({
      color: "negative",
      message: message,
      position: "top"
    });
    return Promise.reject(error);
  }
);
