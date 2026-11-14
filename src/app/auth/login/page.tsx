import { Header } from "@/components/layout/Header";
import { LoginForm } from "@/modules/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-auth relative flex min-h-svh flex-col">
      {/* Top navigation bar */}
      <Header />

      {/* Centered login card */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-[480px]">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
