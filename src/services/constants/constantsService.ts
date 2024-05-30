
export enum Colors {
  PRIMARY = "#FF0000",
  SECONDARY = "#00FF00",
  TERTIARY = "#0000FF",
  WHITE = "#FFFFFF",
  BLACK = "#000000",
}

export const TextUIConstants = {
    ButtonTexts: {
        Submit: "Submit"
    },
    PageTitles: {
        AdminDashboard: "Admin Dashboard",
        Login: "Login",
        UserDashboard: "User Dashboard",
        GenericLanding: "Generic Landing",
        "404": "Not Found",
    },
    ErrorMessages: {
        EmailRequired: "Email is required",
        PasswordRequired: "Password is required",
        InvalidEmail: "Invalid email",
        InvalidPassword: "Invalid password",
        InvalidCredentials: "Invalid credentials",
        PasswordsDoNotMatch: "Passwords do not match",
        PasswordMinLength: "Password must be at least 8 characters",
        PasswordMaxLength: "Password must be at most 20 characters",
        PasswordUppercase: "Password must contain at least one uppercase letter",
        PasswordLowercase: "Password must contain at least one lowercase letter",
        PasswordNumber: "Password must contain at least one number",
        PasswordSpecialCharacter: "Password must contain at least one special character",
        PasswordInvalid: "Invalid password",
        TokenInvalid: "Invalid token",
    },
    SuccessMessages: {
        PasswordReset: "Password reset successfully",
    },
    Prompts: {
        EnterEmail: "Enter your email",
        ConfirmPassword: "Confirm Password",
        NewPassword: "Enter New Password",
        ForgotPassword: "Forgot Password?",
    },
    InputPlaceholders: {
        Email: "email",
        Password: "password",
        Username: "username or email",
    },
}

export enum UrlPaths {
  LOGIN = "/login",
  ROOT = "/",
  DASHBOARD = "/dashboard",
  FORGOT_PASSWORD = "/forgot-password",
  PROFILE = "/profile",
  LOGOUT = "/logout",
  RESET_PASSWORD = "/resetPassword/confirm/",
  USER_DASHBOARD = "/dashboard/user",
  ADMIN_DASHBOARD = "/dashboard/admin",
  ANY = "*",
}

export const APIPaths = {
  AuthAPIPaths: {
    GET_TOKEN: "/auth/token/",
    GET_ME: "/me",
    FORGOT_PASSWORD: "/auth/password-reset/",
    RESET_PASSWORD: "/auth/password-reset/confirm/",
    VERIFY_TOKEN: "/auth/token/verify/",
    REFRESH_TOKEN: "/auth/token/refresh/",
  },
};
export const AuthThunkNamePrefix = "authThunk/";

export const enum UserRoles {
  USER = "USER",
  ADMIN = "ADMIN",
}

export const StringConstants = {
  localStorageKeys: {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
  },
};

export const HTTPMethods = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

export const HTTPModes = {
  CORS: "cors",
  NO_CORS: "no-cors",
  SAME_ORIGIN: "same-origin",
};

export const HTTPCachePolicies = {
  NO_CACHE: "no-cache",
  RELOAD: "reload",
  FORCE_CACHE: "force-cache",
  ONLY_IF_CACHED: "only-if-cached",
};

export const HTTPCredentials = {
    INCLUDE: "include",
    SAME_ORIGIN: "same-origin",
    OMIT: "omit",
}

export const HTTPRedirect = {
    ERROR: "error",
    FOLLOW: "follow",
    MANUAL: "manual",
}

export const HTTPReferrerPolicy = {
    NO_REFERRER: "no-referrer",
    NO_REFERRER_WHEN_DOWNGRADE: "no-referrer-when-downgrade",
    ORIGIN: "origin",
    ORIGIN_WHEN_CROSS_ORIGIN: "origin-when-cross-origin",
    SAME_ORIGIN: "same-origin",
    STRICT_ORIGIN: "strict-origin",
    STRICT_ORIGIN_WHEN_CROSS_ORIGIN: "strict-origin-when-cross-origin",
    UNSAFE_URL: "unsafe-url",
}

export enum SliceNames {
    AUTH = "auth",
}