import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { ENV } from "@/config/env";
import { useAuthStore } from "@/modules/auth/store/auth.store";

import type { ApiSuccessResponse, RefreshTokenData, RefreshTokenPayload } from "@/modules/auth/types/auth.types";

export const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

type RetriableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const REFRESH_URL = "/auth/refresh";

let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (accessToken: string) => void;
  reject: (error: unknown) => void;
}> = [];

function resolveQueue(accessToken: string) {
  refreshQueue.forEach(({ resolve }) => resolve(accessToken));
  refreshQueue = [];
}

function rejectQueue(error: unknown) {
  refreshQueue.forEach(({ reject }) => reject(error));
  refreshQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (error.response?.status !== 401 || !originalRequest || originalRequest.url === REFRESH_URL) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      useAuthStore.getState().clear();
      return Promise.reject(error);
    }

    const { refreshToken } = useAuthStore.getState();

    if (!refreshToken) {
      useAuthStore.getState().clear();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then((accessToken) => {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      });
    }

    isRefreshing = true;

    try {
      const response = await axios.post<ApiSuccessResponse<RefreshTokenData>>(
        `${ENV.API_BASE_URL}${REFRESH_URL}`,
        { refresh_token: refreshToken } satisfies RefreshTokenPayload
      );
      const { access_token, refresh_token } = response.data.data;

      useAuthStore.getState().setTokens(access_token, refresh_token);
      resolveQueue(access_token);

      originalRequest.headers.Authorization = `Bearer ${access_token}`;
      return api(originalRequest);
    } catch (refreshError) {
      rejectQueue(refreshError);
      useAuthStore.getState().clear();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
