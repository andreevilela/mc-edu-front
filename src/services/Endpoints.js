import axios from "axios";

const httpClient = axios.create({
    baseURL: "http://192.168.100.103:8080",
    headers: {
      "Content-type": "application/json"
    }
  })
  

  export const create = data => {
    return httpClient.post("/alunos", data);
  };

  export const get = email => {
    return httpClient.get(`/alunos/email/${email}`);
  };