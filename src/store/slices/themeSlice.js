import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatWindowIsOpen: false,
  fullScreen: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    minimize: (state) => {
      state.fullScreen = false;
    },
    maximize: (state) => {
      state.fullScreen = true;
    },
    open: (state) => void (state.chatWindowIsOpen = true),
    close: (state) => void (state.chatWindowIsOpen = false),
  },
});

export const { minimize, maximize, open, close } = themeSlice.actions;
export default themeSlice.reducer;
