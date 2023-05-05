import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getIssueByProjectKeyAPI,
  getPriorityList,
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
  error: "",
  loading: false,
};
export const getStatus = createAsyncThunk("issue/status", async (access) => {
  try {
    const { data } = await getStatusList(access);
    console.log(data);
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

export const getType = createAsyncThunk("issue/type", async (access) => {
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
      console.log(data);
      return data;
    } catch (error) {
      return error;
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
    [getType.fulfilled]: (state, action) => {
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
      state.issues = actiion.payload.data.issue;
      state.team = actiion.payload.data.team;
    },
    [getIssuesByProjectKey.rejected]: (state, actiion) => {
      state.error = actiion.payload;
    },
  },
});

export default issueSlice.reducer;
