import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getPriorityList,
  getStatusList,
  getTypeList,
  getUserList,
} from "../api";

const initialState = {
  status: [],
  priority: [],
  type: [],
  userList: [],
  error: "",
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

const issueSlice = createSlice({
  initialState,
  name: "issueSlice",
  extraReducers: {
    [getStatus.fulfilled]: (state, action) => {
      state.status = action.payload;
      console.log(action.payload);
    },
    // [getStatus.rejected]: (state, action) => {
    //   state.status = action.payload;
    //   console.log(action.payload);
    // },

    [getPriority.fulfilled]: (state, action) => {
      state.priority = action.payload;
    },
    [getType.fulfilled]: (state, action) => {
      state.type = action.payload;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.userList = action.payload;
    },
  },
});

export default issueSlice.reducer;
