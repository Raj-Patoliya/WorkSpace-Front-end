import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";
const initialState = {
  user: null,
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
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
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
export default authSlice.reducer;
