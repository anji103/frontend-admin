import { z } from "zod";

import { emailField } from "@/modules/auth/schemas/shared";

export const forgotPasswordSchema = z.object({
  email: emailField,
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
