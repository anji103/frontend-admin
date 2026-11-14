export type AdminRole = "super_admin";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginData = {
  access_token: string;
  refresh_token: string;
  id: string;
  email: string;
  role: AdminRole;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResendOtpPayload = {
  email: string;
};

export type VerifyOtpPayload = {
  email: string;
  otp: string;
};

export type VerifyOtpData = {
  id: string;
};

export type ResetPasswordPayload = {
  user_id: string;
  password: string;
};

export type RefreshTokenPayload = {
  refresh_token: string;
};

export type RefreshTokenData = {
  access_token: string;
  refresh_token: string;
};

export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
