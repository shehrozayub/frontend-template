import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosAPIService from "../../services/api/axiosAPIService";
import { APIResponse } from "../../models/generic";
import { ForgotPasswordInput, ResetPasswordInput, SignInInput, SignInResponse, User } from "../../models/auth";
import { APIPaths } from "../../services/constants/constantsService";
import { generateThunkName, isSuccessResponse } from "../../services/globalFunctions";

const apiService = new AxiosAPIService();

const AuthAPIPaths = APIPaths.AuthAPIPaths;

export const signinUser = createAsyncThunk(
  generateThunkName(AuthAPIPaths.GET_TOKEN),
  async (payload: SignInInput, { rejectWithValue }) => {
    const response:APIResponse<SignInResponse> = await apiService.apiPost(AuthAPIPaths.GET_TOKEN, payload);

    if (isSuccessResponse(response)) return await response.json();
    else return rejectWithValue(await response.json());
  }
);

export const getMe = createAsyncThunk(
  generateThunkName(AuthAPIPaths.GET_ME),
  async (payload, { rejectWithValue }) => {
    const response = await apiService.apiGetAuthenticated(AuthAPIPaths.GET_ME);

    if (isSuccessResponse(response)) return await response.json();
    else return rejectWithValue(await response.json());
  }
);

export const forgotPassword = createAsyncThunk(
  generateThunkName(AuthAPIPaths.FORGOT_PASSWORD),
  async (payload: ForgotPasswordInput , { rejectWithValue }) => {
    const response = await apiService.apiPost(AuthAPIPaths.FORGOT_PASSWORD, payload);

    if (isSuccessResponse(response)) return await response.json();
    else return rejectWithValue(await response.json());
  }
);

export const resetPassword = createAsyncThunk(
  generateThunkName(AuthAPIPaths.RESET_PASSWORD),
  async (payload: ResetPasswordInput, { rejectWithValue }) => {
    const response = await apiService.apiPost(AuthAPIPaths.RESET_PASSWORD, payload);

    if (isSuccessResponse(response)) return await response.json();
    else return rejectWithValue(await response.json());
  }
);