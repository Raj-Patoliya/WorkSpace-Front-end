import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
// import { getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"],
};
const appReducer = combineReducers({
  state: (state = {}) => state,
  user: authSlice,
});
// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false,
// });
const persistReducers = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistReducers,
  // middleware: customizedMiddleware,
});
