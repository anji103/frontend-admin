import { z } from "zod";

export const OTP_LENGTH = 6;

export const verifyOtpSchema = z.object({
  otp: z.string().length(OTP_LENGTH, `Enter the ${OTP_LENGTH}-digit code`),
});

export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;
