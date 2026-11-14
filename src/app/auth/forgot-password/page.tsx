import { Header } from "@/components/layout/Header";
import { ForgotPasswordForm } from "@/modules/auth/components/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password — OhMind Admin",
};

export default function ForgotPasswordPage() {
  return (
    <div className="bg-auth relative flex min-h-svh flex-col">
      {/* Same top navigation as the login page */}
      <Header />

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-[480px]">
          <ForgotPasswordForm />
        </div>
      </main>
    </div>
  );
}
