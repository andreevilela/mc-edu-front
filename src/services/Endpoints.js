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

export const getTurmasUsuario = id => {
  return httpClient.get(`/turmas/usuario/${id}`);
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

export const createNewTurma = data => {
  return httpClient.post("/turmas", data);
};

export const joinTurma = data => {
  return httpClient.post("/turmas/inscricao", data);
};

export const createPost = data => {
  return httpClient.post("/postagens", data);
};