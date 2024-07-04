import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  sucess: null,
  token: localStorage.getItem("userToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.token = action.payload;
      state.error = false;
      state.sucess = true;
      localStorage.setItem("userToken", action.payload);
    },
    authError: (state) => {
      state.error = true;
      state.sucess = false;
      state.user = null;
      state.token = null;
    },
    setProfile: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      localStorage.removeItem("userToken");
      state.user = null;
      state.token = null;
    },
  },
});

export const { signIn, authError, setProfile, signOut } = authSlice.actions;
export default authSlice.reducer;
