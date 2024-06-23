import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    user: userSlice, // reducer to managed user profile details
    auth: authSlice, // reducer to managed user auth status
  },
});
