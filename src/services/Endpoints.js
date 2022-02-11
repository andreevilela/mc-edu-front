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

export const getTurmasAluno = id => {
  return httpClient.get(`/turmas/aluno/${id}`);
};

export const getPostagensTurma = id => {
  return httpClient.get(`/postagens/turma/${id}`);
};

export const getDetalhesPostagem = id => {
  return httpClient.get(`/postagens/${id}`);
};