import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./auth/authSlice";
import { AuthState } from "../models/auth";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },

});

export type AppDispatch = typeof store.dispatch
export type RootState = {
  auth: AuthState
}