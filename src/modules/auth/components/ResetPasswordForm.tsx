"use client";

import { Icon } from "@iconify/react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { ROUTES } from "@/constants/routes";
import { getApiErrorMessage } from "@/lib/api-error";
import { cn } from "@/lib/utils";
import { useResetPassword } from "@/modules/auth/hooks/use-reset-password";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/modules/auth/schemas/reset-password.schema";

const defaultValues: ResetPasswordFormValues = {
  password: "",
  confirmPassword: "",
};

export interface ResetPasswordFormProps extends React.ComponentProps<"div"> {
  userId: string;
}

export function ResetPasswordForm({ className, userId, ...props }: ResetPasswordFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { mutateAsync, isPending } = useResetPassword();

  const form = useForm({
    defaultValues,
    validators: {
      onChange: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const message = await mutateAsync({ user_id: userId, password: value.password });
        toast.add({ title: message || "Password reset successfully", type: "success" });
        router.push(ROUTES.login);
      } catch (error) {
        toast.add({
          title: getApiErrorMessage(error),
          description: "",
          type: "error",
        });
      }
    },
  });

  return (
    <div className={cn("w-full", className)} {...props}>
      <Card className="border-border-strong bg-card rounded-[1rem] border p-[3.75rem] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.15)]">
        <CardHeader className="items-center gap-6 text-center">
          <div
            aria-hidden="true"
            className="flex size-[5.5rem] items-center justify-center rounded-full bg-[#ffe1c8]"
          >
            <Icon icon="mdi:lock-reset" width={48} height={48} className="text-brand-tangerine" />
          </div>

          <div className="flex w-full flex-col items-center gap-4">
            <h1 className="text-foreground text-[2rem] leading-none font-semibold">
              Reset Password
            </h1>
            <CardDescription className="max-w-[20rem] text-base text-[#77778e]">
              Create a new password for your account.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="mt-4">
          <form
            className="flex flex-col gap-6"
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field name="password">
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <div className="relative">
                    <Icon
                      icon="hugeicons:square-lock-password"
                      width={20}
                      height={20}
                      className="text-brand-blue pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
                    />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="New Password"
                      autoComplete="new-password"
                      value={field.state.value}
                      onChange={(event) => field.handleChange(event.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={!field.state.meta.isValid}
                      className="border-border-strong h-[3.625rem] rounded-[1rem] pr-12 pl-12 text-base shadow-[0px_0px_2px_0px_rgba(0,0,0,0.15)]"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2 rounded-md transition-colors"
                    >
                      <Icon
                        icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
                        width={20}
                        height={20}
                      />
                    </Button>
                  </div>
                  <FieldError errors={field.state.meta.errors.slice(0, 1)} />
                </div>
              )}
            </form.Field>

            <form.Field name="confirmPassword">
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <div className="relative">
                    <Icon
                      icon="hugeicons:square-lock-password"
                      width={20}
                      height={20}
                      className="text-brand-blue pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
                    />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm New Password"
                      autoComplete="new-password"
                      value={field.state.value}
                      onChange={(event) => field.handleChange(event.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={!field.state.meta.isValid}
                      className="border-border-strong h-[3.625rem] rounded-[1rem] pr-12 pl-12 text-base shadow-[0px_0px_2px_0px_rgba(0,0,0,0.15)]"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => setShowConfirmPassword((value) => !value)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      className="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2 rounded-md transition-colors"
                    >
                      <Icon
                        icon={showConfirmPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
                        width={20}
                        height={20}
                      />
                    </Button>
                  </div>
                  <FieldError errors={field.state.meta.errors.slice(0, 1)} />
                </div>
              )}
            </form.Field>

            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
              {([canSubmit, isSubmitting]) => {
                const submitting = isSubmitting || isPending;

                return (
                  <Button
                    type="submit"
                    disabled={!canSubmit || submitting}
                    className={cn(
                      "border-brand-tangerine bg-brand-tangerine h-[3.625rem] w-full rounded-[1rem] border px-5",
                      "text-brand-blue justify-between text-[1.125rem] font-semibold",
                      "hover:bg-brand-tangerine-light shadow-[0px_0px_1px_rgba(0,0,0,0.15)]",
                      "disabled:cursor-not-allowed disabled:opacity-70"
                    )}
                  >
                    <span className="flex-1 text-center">
                      {submitting ? "Resetting..." : "Reset Password"}
                    </span>
                    <Icon icon="ep:right" className="size-7 text-brand-blue" />
                  </Button>
                );
              }}
            </form.Subscribe>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
