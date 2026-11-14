"use client";

import { ReactNode } from "react";

import { Toaster } from "@/components/ui/toast";

import { QueryProvider } from "./QueryProvider";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Providers Component
 * Wraps the app with all necessary providers
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <Toaster>{children}</Toaster>
    </QueryProvider>
  );
}
