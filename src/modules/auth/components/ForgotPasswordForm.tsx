"use client";

import { Icon } from "@iconify/react";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/components/ui/toast";
import { ROUTES } from "@/constants/routes";
import { getApiErrorMessage } from "@/lib/api-error";
import { cn } from "@/lib/utils";
import { ResetPasswordForm } from "@/modules/auth/components/ResetPasswordForm";
import { useForgotPassword } from "@/modules/auth/hooks/use-forgot-password";
import { useResendOtp } from "@/modules/auth/hooks/use-resend-otp";
import { useVerifyOtp } from "@/modules/auth/hooks/use-verify-otp";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/modules/auth/schemas/forgot-password.schema";
import {
  OTP_LENGTH,
  verifyOtpSchema,
  type VerifyOtpFormValues,
} from "@/modules/auth/schemas/verify-otp.schema";

const OTP_EXPIRY_SECONDS = 120;

type Step = "email" | "otp" | "reset";

const emailDefaultValues: ForgotPasswordFormValues = { email: "" };
const otpDefaultValues: VerifyOtpFormValues = { otp: "" };

function useCountdown(initialSeconds: number) {
  const [remaining, setRemaining] = React.useState(initialSeconds);
  const [running, setRunning] = React.useState(false);

  const start = React.useCallback(() => {
    setRemaining(initialSeconds);
    setRunning(true);
  }, [initialSeconds]);

  React.useEffect(() => {
    if (!running || remaining <= 0) return;

    const id = window.setTimeout(() => {
      setRemaining((value) => {
        if (value <= 1) {
          setRunning(false);
          return 0;
        }

        return value - 1;
      });
    }, 1000);

    return () => window.clearTimeout(id);
  }, [remaining, running]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return {
    display: `${mm}:${ss}`,
    expired: remaining <= 0,
    start,
  };
}

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
  const [step, setStep] = React.useState<Step>("email");
  const [email, setEmail] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const countdown = useCountdown(OTP_EXPIRY_SECONDS);

  const { mutateAsync: sendForgotPassword, isPending: isSendingEmail } = useForgotPassword();
  const { mutateAsync: verifyOtpCode, isPending: isVerifyingOtp } = useVerifyOtp();
  const { mutateAsync: resendOtpCode, isPending: isResending } = useResendOtp();

  const emailForm = useForm({
    defaultValues: emailDefaultValues,
    validators: {
      onChange: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const message = await sendForgotPassword(value);
        toast.add({ title: message || "OTP sent successfully", type: "success" });
        setEmail(value.email);
        otpForm.reset();
        setStep("otp");
        countdown.start();
      } catch (error) {
        toast.add({
          title: getApiErrorMessage(error),
          description: "",
          type: "error",
        });
      }
    },
  });

  const otpForm = useForm({
    defaultValues: otpDefaultValues,
    validators: {
      onChange: verifyOtpSchema,
    },
    onSubmit: async ({ value }) => {
      if (countdown.expired) return;

      try {
        const data = await verifyOtpCode({ email, otp: value.otp });
        setUserId(data.id);
        setStep("reset");
      } catch (error) {
        toast.add({
          title: getApiErrorMessage(error),
          description: "",
          type: "error",
        });
      }
    },
  });

  async function handleResend() {
    try {
      const message = await resendOtpCode({ email });
      toast.add({ title: message || "OTP resent successfully", type: "success" });
      otpForm.reset();
      countdown.start();
    } catch (error) {
      toast.add({
        title: getApiErrorMessage(error),
        description: "",
        type: "error",
      });
    }
  }

  function handleBackToEmail() {
    otpForm.reset();
    setStep("email");
  }

  if (step === "reset") {
    return <ResetPasswordForm className={className} userId={userId} {...props} />;
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      <Card className="border-border-strong bg-card rounded-[1rem] border p-[3.75rem] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.15)]">
        <CardHeader className="items-center gap-6 text-center">
          <div
            aria-hidden="true"
            className="flex size-[5.5rem] items-center justify-center rounded-full bg-[#ffe1c8]"
          >
            <Icon icon="mdi:key" width={48} height={48} className="text-brand-tangerine" />
          </div>

          <div className="flex w-full flex-col items-center gap-4">
            <h1 className="text-foreground text-[2rem] leading-none font-semibold">
              Forgot Password
            </h1>

            {step === "email" && (
              <CardDescription className="max-w-[20rem] text-base text-[#77778e]">
                Enter your email address and we&apos;ll send you a 6-digit OTP to reset your
                password.
              </CardDescription>
            )}

            {step === "otp" && (
              <div className="flex flex-col">
                <CardDescription className="text-base text-[#77778e] m-0 p-0">
                  We&apos;ve sent a 6-digit OTP to
                </CardDescription>
                <span className="text-sm text-brand-tangerine font-semibold">{email}</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="mt-4">
          {step === "email" && (
            <form
              className="flex flex-col gap-6"
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                emailForm.handleSubmit();
              }}
            >
              <emailForm.Field name="email">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <div className="relative my-4">
                      <Icon
                        icon="material-symbols:mail-outline-rounded"
                        width={20}
                        height={20}
                        className="text-brand-blue pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
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
                        className="border-border-strong h-[3.625rem] rounded-[1rem] pl-12 text-base shadow-[0px_0px_2px_0px_rgba(0,0,0,0.15)]"
                      />
                    </div>
                    <FieldError errors={field.state.meta.errors.slice(0, 1)} />
                  </div>
                )}
              </emailForm.Field>

              <emailForm.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting] as const}
              >
                {([canSubmit, isSubmitting]) => {
                  const submitting = isSubmitting || isSendingEmail;

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
                        {submitting ? "Sending..." : "Send OTP"}
                      </span>
                      <Icon icon="ep:right" className="size-7 text-brand-blue" />
                    </Button>
                  );
                }}
              </emailForm.Subscribe>

              <p className="text-muted-foreground text-center text-sm">
                Remember your password?{" "}
                <Link
                  href={ROUTES.login}
                  className="text-brand-tangerine font-medium underline-offset-4 transition-colors hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          )}

          {step === "otp" && (
            <form
              className="flex flex-col gap-6"
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                otpForm.handleSubmit();
              }}
            >
              <otpForm.Field name="otp">
                {(field) => (
                  <div className="flex flex-col items-center gap-1.5">
                    <InputOTP
                      maxLength={OTP_LENGTH}
                      value={field.state.value}
                      onChange={(value) => field.handleChange(value)}
                      onBlur={field.handleBlur}
                      disabled={countdown.expired}
                      containerClassName="justify-center"
                    >
                      <InputOTPGroup className="w-full justify-center gap-[5px]">
                        {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className={cn(
                              "size-auto h-[3.625rem] w-[3.125rem] rounded-[1rem] border border-[#77778e]",
                              "text-foreground text-base font-normal shadow-[0px_0px_2px_0px_rgba(0,0,0,0.15)]",
                              "first:rounded-[1rem] first:border last:rounded-[1rem] last:border",
                              "data-[active=true]:border-border-strong data-[active=true]:ring-ring/30 data-[active=true]:ring-2"
                            )}
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                    <FieldError errors={field.state.meta.errors.slice(0, 1)} />
                  </div>
                )}
              </otpForm.Field>

              <div className="flex items-center justify-center gap-[0.6875rem]">
                <Icon
                  icon="tabler:clock"
                  width={20}
                  height={20}
                  className="text-muted-foreground"
                />
                <p className="text-muted-foreground text-xs">OTP will expire in</p>
                <p
                  className={cn(
                    "text-xs font-normal tabular-nums",
                    countdown.expired ? "text-destructive" : "text-brand-tangerine"
                  )}
                >
                  {countdown.expired ? "Expired" : countdown.display}
                </p>
              </div>

              <otpForm.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting] as const}
              >
                {([canSubmit, isSubmitting]) => {
                  const submitting = isSubmitting || isVerifyingOtp;

                  return (
                    <Button
                      type="submit"
                      disabled={!canSubmit || countdown.expired || submitting}
                      className={cn(
                        "border-brand-tangerine bg-brand-tangerine h-[3.625rem] w-full rounded-[1rem] border px-5",
                        "text-brand-blue justify-between text-[1.125rem] font-semibold",
                        "hover:bg-brand-tangerine-light shadow-[0px_0px_1px_rgba(0,0,0,0.15)]",
                        "disabled:cursor-not-allowed disabled:opacity-70"
                      )}
                    >
                      <span className="flex-1 text-center">
                        {submitting ? "Verifying..." : "Verify and Proceed"}
                      </span>
                      <Icon icon="ep:right" className="size-7 text-brand-blue" />
                    </Button>
                  );
                }}
              </otpForm.Subscribe>

              <p className="text-muted-foreground text-center text-xs">
                Didn&apos;t receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-brand-tangerine font-semibold underline-offset-4 transition-colors hover:underline disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isResending ? "Resending..." : "Resend OTP"}
                </button>
              </p>

              <p className="text-muted-foreground -mt-2 text-center text-sm">
                <button
                  type="button"
                  onClick={handleBackToEmail}
                  className="text-brand-tangerine font-medium underline-offset-4 transition-colors hover:underline"
                >
                  Change email
                </button>
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
