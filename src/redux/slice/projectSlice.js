import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";
const initialState = {
  allProjectList: [],
  loading: false,
};
export const project = createAsyncThunk("project-list", async (access) => {
  try {
    const { data } = await axios.get(
      "http://127.0.0.1:8000/project/all-list/",
      {
        headers: { Authorization: `Bearer ${access}` },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
});
const projectSlice = createSlice({
  initialState,
  name: "projectSlice",
  extraReducers: {
    [project.pending]: (state, action) => {
      state.loading = true;
    },
    [project.fulfilled]: (state, action) => {
      state.loading = false;
      state.allProjectList = action.payload.data.projects;
    },
    [project.rejected]: (state, action) => {
      state.loading = false;
      //   for (var i in action.payload) {
      //      toast.error(action.payload[i]);
      //   }
      state.error = "Login Failed Invalid id Password";
    },
  },
});
export default projectSlice.reducer;
