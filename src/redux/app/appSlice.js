import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getErrorDetailsforNotif } from "../../services/globalFunctions";
import { forgotPassword, getMe, resetPassword, signinUser } from "./appThunks";

const initialState = {
  isInitialized: false,
  user: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    initializeApp: (state) => {
      state.isInitialized = true;
    },
    logOutUser: (state) => {
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: {
    [signinUser.fulfilled]: (state, { payload }) => {
      localStorage.setItem("accessToken", payload.token.access);
      localStorage.setItem("refreshToken", payload.token.refresh);
      state.user = payload.user;
    },
    [signinUser.rejected]: (state, action) => {
      toast.error(getErrorDetailsforNotif(action.payload));
    },
    [getMe.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isInitialized = true;
    },
    [getMe.rejected]: (state) => {
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.isInitialized = true;
    },
    [forgotPassword.rejected]: (state, action) => {
      toast.error(getErrorDetailsforNotif(action.payload));
    },
    [forgotPassword.fulfilled]: () => {

      toast("Please check your email for reset link");


    },
    [resetPassword.rejected]: (state, action) => {
      toast.error(getErrorDetailsforNotif(action.payload));

    },
    [resetPassword.fulfilled]: () => {

      toast("Password reset succesfully");


    },

  },
});

// Action creators are generated for each case reducer function
export const { initializeApp, logOutUser } = appSlice.actions;

export default appSlice.reducer;
