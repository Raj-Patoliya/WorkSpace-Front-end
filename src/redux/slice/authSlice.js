import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";
const initialState = {
  token: [],
  error: "",
  message: "",
  loading: false,
  isLoggedIn: false,
  currentUser: [],
};

export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.LoginAPI(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "getCurrentUser",
  async ({ access }) => {
    console.log(access);
    try {
      const { data } = await api.getCurrentUserAPI(access);
      return data;
    } catch (error) {
      return null;
    }
  }
);

const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    logout: (state, action) => {
      localStorage.clear();
      state = initialState;
      return initialState;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.error = "";
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.error = "";
      state.isLoggedIn = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload.detail;
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload.currentUser;
    },
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
