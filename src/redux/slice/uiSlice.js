import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewCreateProjectModal: false,
};
const uiSlice = createSlice({
  initialState,
  name: "ui",
  reducers: {
    toggle: (state) => {
      state.viewCreateProjectModal = !state.viewCreateProjectModal;
    },
  },
});
export default uiSlice.reducer;
