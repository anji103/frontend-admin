import { z } from "zod";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emailField = z
  .string()
  .min(1, "Email is required")
  .regex(EMAIL_REGEX, "Enter a valid email address");
