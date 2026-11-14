"use client";

import { Icon } from "@iconify/react";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
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
import { useLogin } from "@/modules/auth/hooks/use-login";
import { loginSchema, type LoginFormValues } from "@/modules/auth/schemas/login.schema";

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
};

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const { mutateAsync, isPending } = useLogin();

  const form = useForm({
    defaultValues,
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync(value);
        toast.add({ title: "Signed in successfully", type: "success" });
        router.push(ROUTES.dashboard);
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
      <Card className="bg-card rounded-[1rem] border border-[var(--brand-blue)] p-[3.75rem] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.15)]">
        <CardHeader className="items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <p className="text-brand-tangerine text-[2rem] leading-none font-semibold">
              Welcome back,
            </p>
            <h1 className="text-foreground text-[2.5rem] leading-none font-semibold">Admin</h1>
          </div>
          <CardDescription className="text-base leading-snug font-normal text-[#77778e]">
            Sign in to your admin account to continue to Oh Mind.
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-4 flex flex-col gap-2">
          <form
            className="flex flex-col gap-6"
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-4">
              <form.Field name="email">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <div className="relative">
                      <Icon
                        icon="material-symbols:mail-outline-rounded"
                        width={20}
                        height={20}
                        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[var(--brand-blue)]"
                      />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                        onBlur={field.handleBlur}
                        aria-invalid={!field.state.meta.isValid}
                        className="h-[3.625rem] rounded-[1rem] border border-[var(--brand-blue)] pl-12 text-[1rem] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.15)]"
                      />
                    </div>
                    <FieldError errors={field.state.meta.errors.slice(0, 1)} />
                  </div>
                )}
              </form.Field>

              <form.Field name="password">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <div className="relative">
                      <Icon
                        icon="hugeicons:square-lock-password"
                        width={20}
                        height={20}
                        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[var(--brand-blue)]"
                      />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                        onBlur={field.handleBlur}
                        aria-invalid={!field.state.meta.isValid}
                        className="h-[3.625rem] rounded-[1rem] border border-[var(--brand-blue)] pl-12 text-[1rem] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.15)]"
                      />
                    </div>
                    <FieldError errors={field.state.meta.errors.slice(0, 1)} />
                  </div>
                )}
              </form.Field>

              <div className="mt-2 flex justify-end">
                <Link
                  href={ROUTES.forgotPassword}
                  className="text-sm underline-offset-4 transition-colors hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
              {([canSubmit, isSubmitting]) => {
                const submitting = isSubmitting || isPending;

                return (
                  <Button
                    type="submit"
                    disabled={!canSubmit || submitting}
                    className={cn(
                      "h-[3.625rem] w-full rounded-[1rem] border border-brand-tangerine bg-brand-tangerine px-5",
                      "justify-between text-[1.125rem] font-semibold text-brand-blue",
                      "shadow-[0px_0px_1px_rgba(0,0,0,0.15)] hover:bg-brand-tangerine-light",
                      "disabled:cursor-not-allowed disabled:opacity-70"
                    )}
                  >
                    <span className="flex-1 text-center">
                      {submitting ? "Signing in..." : "Sign in"}
                    </span>
                    <Icon icon="ep:right" className="size-7 text-[var(--brand-blue)]" />
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
