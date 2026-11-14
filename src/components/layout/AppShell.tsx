import { type ReactNode } from "react";

import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

interface AppShellProps {
  children: ReactNode;
}

/**
 * AppShell — wraps every authenticated page with sidebar + header.
 * Background uses the `background` semantic token so it adapts to dark mode.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className="bg-background flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex min-h-0 flex-1 gap-4 overflow-hidden p-4 sm:gap-6 sm:p-6 lg:gap-8 lg:p-8">
        <Sidebar />
        <main className="scrollbar-brand min-h-0 min-w-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
