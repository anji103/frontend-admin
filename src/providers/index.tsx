"use client";

import { ReactNode } from "react";

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
        {children}
    </QueryProvider>
  );
}
