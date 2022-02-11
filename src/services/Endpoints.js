import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://192.168.56.1:8080",
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

export const getUsuario = id => {
  return httpClient.get(`/usuarios/${id}`);
};

export const createTurma = data => {
  return httpClient.post("/turmas", data);
};