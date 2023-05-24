import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddTeamMemberAPI,
  ProjectListAPI,
  getProjectByKeyAPI,
  getTeamByProjectKeyAPI,
} from "../api";  

const initialState = {
  allProjectList: [],
  currentProject: {},
  team: [],
  loading: false,
};
export const getProjects = createAsyncThunk("project-list", async (access) => {
  try {
    const { data } = await ProjectListAPI(access);
    return data;
  } catch (error) {
    return null;
  }
});
export const getProjectByKey = createAsyncThunk(
  "projectby-key",
  async ({ access, keys }) => {
    try {
      const { data } = await getProjectByKeyAPI(access, keys);
      return data;
    } catch (e) {
      return e;
    }
  }
);
export const getProjectTeam = createAsyncThunk(
  "project-team-key",
  async ({ access, keys }) => {
    try {
      const { data } = await getTeamByProjectKeyAPI(access, keys);
      return data;
    } catch (error) {
      return null;
    }
  }
);

export const addProjectTeamMember = createAsyncThunk(
  "project-team-member",
  async ({ access, formData }) => {
    try {
      console.log(access);
      const { data } = await AddTeamMemberAPI(access, formData);
      console.log(data);
      return data;
    } catch (error) {
      return null;
    }
  }
);

const projectSlice = createSlice({
  initialState,
  name: "projectSlice",
  extraReducers: {
    [getProjects.pending]: (state, action) => {
      state.loading = true;
    },
    [getProjects.fulfilled]: (state, action) => {
      state.loading = false;
      state.allProjectList = action.payload;
      // console.log(action.payload.results);
    },
    [getProjects.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Login Failed Invalid id Password";
    },
    [getProjectByKey.fulfilled]: (state, action) => {
      state.currentProject = action.payload;
    },

    [getProjectTeam.fulfilled]: (state, action) => {
      state.team = action.payload.data;
    },
    [addProjectTeamMember.fulfilled]: (state, action) => {
      state.loading = false;
    },
  },
});
export default projectSlice.reducer;
