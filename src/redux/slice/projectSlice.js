import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProjectListAPI } from "../api";

const initialState = {
  allProjectList: [],
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
const projectSlice = createSlice({
  initialState,
  name: "projectSlice",
  extraReducers: {
    [getProjects.pending]: (state, action) => {
      state.loading = true;
    },
    [getProjects.fulfilled]: (state, action) => {
      state.loading = false;
      state.allProjectList = action.payload.data.projects;
    },
    [getProjects.rejected]: (state, action) => {
      state.loading = false;
      //   for (var i in action.payload) {
      //      toast.error(action.payload[i]);
      //   }
      state.error = "Login Failed Invalid id Password";
    },
  },
});
export default projectSlice.reducer;
