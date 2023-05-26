import axios from "axios";
import axiosInstance from "./AxoisConfig";

export const API = axios.create({
  baseURL: process.env.REACT_APP_LOCAL_HOST_URL,
  headers: {
    "Content-Type": `multipart/form-data`,
  },
});

export const LoginAPI = (formData) =>
  axiosInstance.post("/user/login/token/", formData);

export const ProfileAvatars = () => axiosInstance.get("/user/avtar/");

export const getCurrentUserAPI = () => axiosInstance.get("/user/current-user");

export const updateProfileAPI = (formData) =>
  axiosInstance.patch("/user/change-profile", formData);

export const changePasswordAPI = (formData) =>
  axiosInstance.post("/user/change-password", formData);

// Project APIs
export const ProjectListAPI = () => axiosInstance.get("/project/all-list/");

export const SearchInProjectListAPI = (formData) =>
  axiosInstance.post("/project/custom-project-list/", formData);

export const ProjectListAPIPagination = (url) => axiosInstance.get(url);

export const CreateProjectAPI = (data) =>
  axiosInstance.post("/project/CRUD/", data);

export const getProjectByKeyAPI = (keys) =>
  axiosInstance.get(`/project/CRUD/${keys}`);

export const getIssueByProjectKeyAPI = (keys) =>
  axiosInstance.get(`/project/work/${keys}`);

export const getTeamByProjectKeyAPI = (keys) =>
  axiosInstance.get(`/project/team/${keys}`);

export const AddTeamMemberAPI = (data) =>
  axiosInstance.post("/project/team/", data);

// Issue APIs
export const getStatusList = () => axiosInstance.get("/issues/issue-status");

export const getPriorityList = () =>
  axiosInstance.get("/issues/issue-priority");

export const getTypeList = () => axiosInstance.get("/issues/issue-type");

export const getUserList = () => axiosInstance.get("/user/list");

export const CreateIssueAPI = (formData) =>
  axiosInstance.post("/issues/issues", formData);

export const updateIssueAPI = (id, formData) =>
  axiosInstance.patch(`/issues/issue-update/${id}`, formData);

export const getIssueByIdAPI = (id) =>
  axiosInstance.get(`/issues/issue-update/${id}`);

export const createCommentAPI = (formData) =>
  axiosInstance.post("/issues/issue-comment-create", formData);
export const deleteCommentAPI = (id) =>
  axiosInstance.delete(`/issues/issue-comment-delete/${id}`);
export const updateCommentAPI = (id, formData) =>
  axiosInstance.patch(`/issues/issue-comment-update/${id}`, formData);

export const UserIssueBasicDetailsAPI = () =>
  axiosInstance.get("/user/user-issue");

export const UploadIssueInBulkAPI = (formData) =>
  axiosInstance.post("/issues/issue-bulk-upload", formData);

export const IssueFilterAPI = (formData) =>
  axiosInstance.post("/issues/issue-filter", formData);

export const deleteIssueAPI = (id) =>
  axiosInstance.delete(`/issues/issue-delete/${id}`);
