import axios from "axios";
import { Notify } from "quasar";

export const httpRequest = axios.create({
  baseURL: "http://localhost:8083"
});

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
    Notify.create({
      color: "negative",
      message: error.response.data.message,
      position: "top"
    });
    return Promise.reject(error);
  }
);
