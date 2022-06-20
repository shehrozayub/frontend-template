import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAuthenticated, apiPost } from "../../services/api/apiService";

export const signupUser = createAsyncThunk(
  "app/signupUser",
  async (payload) => {
    console.log("inthunk", payload);
    return true;
  }
);
export const signinUser = createAsyncThunk(
  "app/signinUser",
  async (payload, { rejectWithValue }) => {
    const response = await apiPost("/auth/token/", payload);

    if (response.status === 200) return await response.json();
    else return rejectWithValue(await response.json());
  }
);
export const getMe = createAsyncThunk(
  "app/getMe",
  async (payload, { rejectWithValue }) => {
    const response = await apiGetAuthenticated("/me");

    if (response.status === 200) return await response.json();
    else return rejectWithValue(await response.json());
  }
);

export const forgotPassword = createAsyncThunk(
  "app/forgotPassword",
  async (payload, { rejectWithValue }) => {
    const response = await apiPost("/auth/password-reset/", payload);

    if (response.status === 200) return await response.json();
    else return rejectWithValue(await response.json());
  }
);

export const resetPassword = createAsyncThunk(
  "app/forgotPassword",
  async (payload, { rejectWithValue }) => {
    const response = await apiPost("/auth/password-reset/confirm/", payload);

    if (response.status === 200) return await response.json();
    else return rejectWithValue(await response.json());
  }
);
