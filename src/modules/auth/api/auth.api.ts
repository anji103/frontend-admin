import { api } from "@/services/api";

import type {
  ApiSuccessResponse,
  ForgotPasswordPayload,
  LoginData,
  LoginPayload,
  ResendOtpPayload,
  ResetPasswordPayload,
  VerifyOtpData,
  VerifyOtpPayload,
} from "@/modules/auth/types/auth.types";

export async function loginAdmin(payload: LoginPayload) {
  const response = await api.post<ApiSuccessResponse<LoginData>>("/auth/admin/login", payload);

  return response.data.data;
}

export async function forgotPassword(payload: ForgotPasswordPayload) {
  const response = await api.post<ApiSuccessResponse<null>>("/auth/admin/forgot-password", payload);

  return response.data.message;
}

export async function resendOtp(payload: ResendOtpPayload) {
  const response = await api.post<ApiSuccessResponse<null>>("/auth/admin/resend-otp", payload);

  return response.data.message;
}

export async function verifyOtp(payload: VerifyOtpPayload) {
  const response = await api.post<ApiSuccessResponse<VerifyOtpData>>("/auth/admin/verify-otp", payload);

  return response.data.data;
}

export async function resetPassword(payload: ResetPasswordPayload) {
  const response = await api.post<ApiSuccessResponse<null>>("/auth/admin/reset-password", payload);

  return response.data.message;
}
