import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import themeSlice from "./slices/themeSlice";
import botSlice from "./slices/chatbotSlice"
import { botApi } from "../services/bot";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    bot: botSlice,
    [botApi.reducerPath]: botApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(botApi.middleware),
});
