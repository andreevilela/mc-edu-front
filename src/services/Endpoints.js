import axios from "axios";

const httpClient = axios.create({
    baseURL: "http://192.168.100.103:8080",
    headers: {
      "Content-type": "application/json"
    }
  })
  

  export const createUser = data => {
    return httpClient.post("/usuarios", data);
  };

  export const get = email => {
    return httpClient.get(`/usuarios/email/${email}`);
  };