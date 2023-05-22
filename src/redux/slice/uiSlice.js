import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewCreateProjectModal: false,
  typeSelection: false,
};
const uiSlice = createSlice({
  initialState,
  name: "ui",
  reducers: {
    toggle: (state) => {
      state.viewCreateProjectModal = !state.viewCreateProjectModal;
    },
    clearSelection: (state, action) => {
      state.typeSelection = action.payload;
      console.log(action.payload);
    },
  },
});
export const { toggle, clearSelection } = uiSlice.actions;
export default uiSlice.reducer;
