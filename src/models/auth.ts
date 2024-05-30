export interface User {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export interface SignInInput {
  username: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  user: User;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  newPassword: string;
  token: string;
}

export type AuthState = {
  isInitialized: boolean;
  user: User | null;
  email: string;
};
