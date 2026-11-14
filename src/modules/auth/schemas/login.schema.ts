import { z } from "zod";

import { emailField } from "@/modules/auth/schemas/shared";

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
