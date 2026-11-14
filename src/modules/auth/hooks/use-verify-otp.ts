import { useMutation } from "@tanstack/react-query";

import { verifyOtp } from "@/modules/auth/api/auth.api";

export function useVerifyOtp() {
  return useMutation({
    mutationFn: verifyOtp,
  });
}
