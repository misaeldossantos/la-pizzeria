import axios from "axios";
import { Notify } from "quasar";

export const httpRequest = axios.create({
  baseURL: "http://localhost:8083"
})

httpRequest.interceptors.response.use((response) => {
  console.log(`response ${response}`);
  return response;
}, (error) => {
  Notify.create({
    color: "red",
    message: error.response.data.message,
    position: "top"
  })
  return Promise.reject(error);
});
