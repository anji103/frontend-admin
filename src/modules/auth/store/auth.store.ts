import { create } from "zustand";

type User = {
    id: string;
    email: string;
    name: string;
};

type AuthState = {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (user: User, accessToken: string) => void;
    logout: () => void;
    setUser: (user: User | null) => void;
    clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    loading: false,
    login: (user, accessToken) =>
        set({
            user,
            accessToken,
            isAuthenticated: true,
            loading: false,
        }),
    logout: () => set({ user: null, accessToken: null, isAuthenticated: false, loading: false }),
    setUser: (user) => set({ user, isAuthenticated: Boolean(user) }),
    clear: () => set({ user: null, accessToken: null, isAuthenticated: false, loading: false }),
}));
