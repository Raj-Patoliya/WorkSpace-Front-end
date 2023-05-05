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
      "Content-Type": "multipart/form-data",
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

export const getIssueByProjectKeyAPI = (token, keys) =>
  AuthAxios(token).get(`/project/work/${keys}`);

// Issue APIs
export const getStatusList = (token) =>
  AuthAxios(token).get("/issues/issue-status");

export const getPriorityList = (token) =>
  AuthAxios(token).get("/issues/issue-priority");

export const getTypeList = (token) =>
  AuthAxios(token).get("/issues/issue-type");

export const getUserList = (token) => AuthAxios(token).get("/user/list");

export const CreateIssueAPI = (token, formData) =>
  AuthAxios(token).post("/issues/issues", formData);

export const updateIssueAPI = (token, id, formData) =>
  AuthAxios(token).patch(`issues/issue-update/${id}`, formData);
