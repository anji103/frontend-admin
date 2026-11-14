import { useMutation } from "@tanstack/react-query";

import { loginAdmin } from "@/modules/auth/api/auth.api";
import { useAuthStore } from "@/modules/auth/store/auth.store";

export function useLogin() {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      login({ id: data.id, email: data.email, role: data.role }, data.access_token, data.refresh_token);
    },
  });
}
