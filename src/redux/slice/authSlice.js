import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";
const initialState = {
  token: [],
  error: "",
  message: "",
  loading: false,
  isLoggedIn: false,
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

const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    logout: (state, action) => {
      localStorage.clear();
      state.error = "";
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
      //   for (var i in action.payload) {
      //      toast.error(action.payload[i]);
      //   }
      state.error = "Login Failed Invalid id Password";
    },
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
