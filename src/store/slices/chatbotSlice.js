import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeBot: null,
  chatRecents: [],
};

const botSlice = createSlice({
  name: "bot",
  initialState,
  reducers: {
    setCurrentBot: (state, action) => {
      if (action.payload) {
        state.activeBot = action.payload;
      }
    },
    setRecents: (state, action) => {
      state.chatRecents = action.payload;
    },
  },
});

export const { setCurrentBot, setRecents } = botSlice.actions;
export default botSlice.reducer;
