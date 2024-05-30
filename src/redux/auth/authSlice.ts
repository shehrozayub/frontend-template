import { createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getErrorDetailsforNotif } from "../../services/globalFunctions";
import { getMe, signinUser } from "./authThunks";
import { User, AuthState, SignInResponse } from "../../models/auth";
import { ErrorResponse } from "../../models/generic";
import { SliceNames, StringConstants } from "../../services/constants/constantsService";


const initialState: AuthState = {
  isInitialized: false,
  user: null,
  email: "",
};

export const authSlice: any = createSlice({
  name: SliceNames.AUTH,
  initialState,
  reducers: {
    initializeApp: (state: AuthState) => {
      state.isInitialized = true;
    },
    setUser: (state: AuthState, action) => {
      state.user = action.payload;
    },
    logOutUser: (state: AuthState) => {
      state.user = null;
      localStorage.removeItem(StringConstants.localStorageKeys.accessToken);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.fulfilled, (state, action) => {
        const payload = action.payload as SignInResponse;
        localStorage.setItem(StringConstants.localStorageKeys.accessToken, payload.token);
        state.user = payload.user;
      })
      .addCase(signinUser.rejected, (state, action) => {
        const payload = action.payload as ErrorResponse;
        toast.error(getErrorDetailsforNotif(payload));
      })
      .addCase(getMe.fulfilled, (state: AuthState, action) => {
        const payload = action.payload as User;
        state.user = payload;
        state.isInitialized = true;
      })
      .addCase(getMe.rejected, (state) => {
        state.user = null;
        localStorage.removeItem(StringConstants.localStorageKeys.accessToken);
        state.isInitialized = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { initializeApp, setUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;