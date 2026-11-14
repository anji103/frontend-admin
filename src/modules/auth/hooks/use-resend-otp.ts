import { useMutation } from "@tanstack/react-query";

import { resendOtp } from "@/modules/auth/api/auth.api";

export function useResendOtp() {
  return useMutation({
    mutationFn: resendOtp,
  });
}
