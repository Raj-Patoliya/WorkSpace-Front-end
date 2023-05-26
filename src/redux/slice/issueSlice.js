import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getIssueByIdAPI,
  getIssueByProjectKeyAPI,
  getPriorityList,
  getProjectByKeyAPI,
  getStatusList,
  getTypeList,
  getUserList,
  updateIssueAPI,
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
  msg: "",
  loading: false,
  singleIssue: {},
};
export const getStatus = createAsyncThunk("issue/status", async () => {
  try {
    const { data } = await getStatusList();
    return data;
  } catch (error) {
    return error;
  }
});

export const getPriority = createAsyncThunk("issue/priority", async () => {
  try {
    const { data } = await getPriorityList();
    return data;
  } catch (error) {
    return error;
  }
});

export const getIssueType = createAsyncThunk("issue/type", async () => {
  try {
    const { data } = await getTypeList();
    return data;
  } catch (error) {
    return error;
  }
});
export const getUsers = createAsyncThunk("issue/userList", async () => {
  try {
    const { data } = await getUserList();
    return data;
  } catch (error) {
    return error;
  }
});

export const getIssuesByProjectKey = createAsyncThunk(
  "work/getIssuesByProjectKey",
  async ({ keys }) => {
    try {
      const { data } = await getIssueByProjectKeyAPI(keys);
      return data;
    } catch (error) {
      return error;
    }
  }
);
export const getCurrentProjects = createAsyncThunk(
  "current-project",
  async ({ keys }) => {
    try {
      const { data } = await getProjectByKeyAPI(keys);
      return data;
    } catch (error) {
      return null;
    }
  }
);
export const updateIssue = createAsyncThunk(
  "update/issues",
  async ({ id, formData }) => {
    try {
      const { data } = await updateIssueAPI(id, formData);
      return data;
    } catch (error) {
      return null;
    }
  }
);

export const getIssueById = createAsyncThunk(
  "issue-by-id",
  async ({ issueId }) => {
    const { data } = await getIssueByIdAPI(issueId);
    return data;
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
      // console.log(actiion.payload);
      state.issues = actiion.payload.data;
    },
    [getIssuesByProjectKey.rejected]: (state, actiion) => {
      state.error = actiion.payload;
    },
    [updateIssue.pending]: (state) => {
      state.loading = true;
    },
    [getCurrentProjects.fulfilled]: (state, actiion) => {
      state.loading = false;
      state.error = "";
      state.currentProject = actiion.payload.data;
      state.team = actiion.payload.team;
      state.currentProject = actiion.payload;
    },
    [updateIssue.pending]: (state) => {
      state.loading = true;
    },
    [updateIssue.fulfilled]: (state, action) => {
      state.loading = false;
      state.msg = action.payload.data;
    },
    [getIssueById.pending]: (state) => {
      state.loading = true;
    },
    [getIssueById.fulfilled]: (state, actiion) => {
      state.loading = false;
      state.singleIssue = actiion.payload;
    },
    [getIssueById.rejected]: (state, actiion) => {
      state.error = actiion.payload;
    },
  },
});

export default issueSlice.reducer;
