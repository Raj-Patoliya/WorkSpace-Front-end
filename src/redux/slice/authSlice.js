import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";
import axiosInstance from "../AxoisConfig";
const initialState = {
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
      axiosInstance.defaults.headers["Authorization"] =
        "Bearer " + response.data.access;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  try {
    const { data } = await api.getCurrentUserAPI();
    return data;
  } catch (error) {
    return error.response.data;
  }
});

const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state = initialState;
      return initialState;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.error = "";
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("access_token", action.payload.access);
      localStorage.setItem("refresh_token", action.payload.refresh);
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
