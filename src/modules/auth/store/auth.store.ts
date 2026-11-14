import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { AdminRole } from "@/modules/auth/types/auth.types";

const AUTH_COOKIE_NAME = "auth_token";
const AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function setAuthCookie(accessToken: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_COOKIE_NAME}=${accessToken}; path=/; max-age=${AUTH_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
}

function clearAuthCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
}

type User = {
  id: string;
  email: string;
  role: AdminRole;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      loading: false,
      login: (user, accessToken, refreshToken) => {
        setAuthCookie(accessToken);
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          loading: false,
        });
      },
      logout: () => {
        clearAuthCookie();
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          loading: false,
        });
      },
      setUser: (user) => set({ user, isAuthenticated: Boolean(user) }),
      setTokens: (accessToken, refreshToken) => {
        setAuthCookie(accessToken);
        set({ accessToken, refreshToken });
      },
      clear: () => {
        clearAuthCookie();
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          loading: false,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
