import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
// import { getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import projectSlice from "./slice/projectSlice";
import issueSlice from "./slice/issueSlice";
import uiSlice from "./slice/uiSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const appReducer = combineReducers({
  state: (state = {}) => state,
  ui: uiSlice,
  auth: authSlice,
  project: projectSlice,
  issue: issueSlice,
});
const persistReducers = persistReducer(persistConfig, appReducer);
export const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
