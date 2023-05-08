import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getIssueByProjectKeyAPI,
  getPriorityList,
  getProjectByKeyAPI,
  getStatusList,
  getTypeList,
  getUserList,
} from "../api";

const initialState = {
  status: [],
  priority: [],
  type: [],
  issues: [],
  team: [],
  userList: [],
  currentProject: [],
  error: "",
  loading: false,
};
export const getStatus = createAsyncThunk("issue/status", async (access) => {
  try {
    const { data } = await getStatusList(access);
    return data;
  } catch (error) {
    return error;
  }
});

export const getPriority = createAsyncThunk(
  "issue/priority",
  async (access) => {
    try {
      const { data } = await getPriorityList(access);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const getIssueType = createAsyncThunk("issue/type", async (access) => {
  try {
    const { data } = await getTypeList(access);
    return data;
  } catch (error) {
    return error;
  }
});
export const getUsers = createAsyncThunk("issue/userList", async (access) => {
  try {
    const { data } = await getUserList(access);
    return data;
  } catch (error) {
    return error;
  }
});

export const getIssuesByProjectKey = createAsyncThunk(
  "work/getIssuesByProjectKey",
  async ({ access, keys }) => {
    try {
      const { data } = await getIssueByProjectKeyAPI(access, keys);
      return data;
    } catch (error) {
      return error;
    }
  }
);
export const getCurrentProjects = createAsyncThunk(
  "current-project",
  async ({ access, keys }) => {
    try {
      const { data } = await getProjectByKeyAPI(access, keys);
      return data;
    } catch (error) {
      return null;
    }
  }
);

const issueSlice = createSlice({
  initialState,
  name: "issueSlice",
  extraReducers: {
    [getStatus.fulfilled]: (state, action) => {
      state.status = action.payload;
      state.loading = false;
      state.error = "";
    },
    [getPriority.fulfilled]: (state, action) => {
      state.priority = action.payload;
      state.loading = false;
      state.error = "";
    },
    [getIssueType.fulfilled]: (state, action) => {
      state.type = action.payload;
      state.loading = false;
      state.error = "";
    },
    [getUsers.fulfilled]: (state, action) => {
      state.userList = action.payload;
      state.loading = false;
      state.error = "";
    },
    [getIssuesByProjectKey.pending]: (state, actiion) => {
      state.loading = true;
    },
    [getIssuesByProjectKey.fulfilled]: (state, actiion) => {
      state.loading = false;
      state.error = "";
      console.log(actiion.payload);
      state.issues = actiion.payload.data;
    },
    [getIssuesByProjectKey.rejected]: (state, actiion) => {
      state.error = actiion.payload;
    },
    [getCurrentProjects.fulfilled]: (state, actiion) => {
      state.loading = false;
      state.error = "";
      console.log(actiion.payload);
      state.currentProject = actiion.payload.data;
      state.team = actiion.payload.team;
      state.currentProject = actiion.payload;
    },
  },
});

export default issueSlice.reducer;
