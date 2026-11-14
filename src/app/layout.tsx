import { Lexend_Deca } from "next/font/google";

import { ENV } from "@/config/env";
import { Providers } from "@/providers";

import type { Metadata } from "next";

import "@/styles/globals.css";

const font = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: ENV.APP_NAME,
  description: "OHMIND Admin Panel",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={font.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
