
import { Roboto_Slab } from "next/font/google";

import { ENV } from "@/config/env";
import { Providers } from "@/providers";

import type { Metadata } from "next";

import "@/styles/globals.css";

const font = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: ENV.APP_NAME,
  description: "OHMIND Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" >
      <body className={font.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
