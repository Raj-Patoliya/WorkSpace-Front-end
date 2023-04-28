import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
// import { getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import projectSlice from "./slice/projectSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};
const appReducer = combineReducers({
  state: (state = {}) => state,
  auth: authSlice,
  project: projectSlice,
});
// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false,
// });
const persistReducers = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistReducers,
  // middleware: customizedMiddleware,
});
