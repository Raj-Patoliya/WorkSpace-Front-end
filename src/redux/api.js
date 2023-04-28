import axios from "axios";

const localhost = "http://127.0.0.1:8000";

const API = axios.create({
  baseURL: localhost,
  headers: {
    "Content-Type": `multipart/form-data`,
  },
});

const AuthAxios = (token) =>
  axios.create({
    baseURL: localhost,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const authHeader = (config) =>
  axios.create({
    baseURL: localhost,
    headers: config.headers,
  });

export const LoginAPI = (formData) => API.post("/user/login/token/", formData);

// Project APIs
export const ProjectListAPI = (token) =>
  AuthAxios(token).get("/project/all-list/");

export const CreateProjectAPI = (token, data) =>
  AuthAxios(token).post("/project/create/", data);
