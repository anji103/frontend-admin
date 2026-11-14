import { isAxiosError } from "axios";

type ApiErrorBody =
  | { success: false; error: { code: string; message: string } }
  | { detail: string | { msg: string }[] };

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong. Please try again.") {
  if (isAxiosError<ApiErrorBody>(error)) {
    const body = error.response?.data;

    if (body && "error" in body) return body.error.message ?? fallback;
    if (body && "detail" in body) {
      return typeof body.detail === "string" ? body.detail : (body.detail[0]?.msg ?? fallback);
    }
  }

  return fallback;
}
