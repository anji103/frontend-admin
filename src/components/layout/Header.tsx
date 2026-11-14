/**
 * Dashboard Header — top bar for authenticated pages.
 * Brand logo (OhMind) sits on the left; company logo on the right.
 * Uses Next.js <Image> with direct module imports for static asset optimisation.
 */
import Image from "next/image";

import companyLogo from "@/public/assets/img/company_logo.png";
import ohmindLogo from "@/public/assets/img/ohmind_logo.png";

export function Header() {
  return (
    <header
      className="border-border bg-card flex h-16 shrink-0 items-center justify-between border-b px-4 sm:px-6 lg:px-8"
      style={{ boxShadow: "var(--shadow-header)" }}
    >
      {/* Left — Brand logo */}
      <div className="flex items-center">
        <Image src={ohmindLogo} alt="OhMind" height={36} priority className="object-contain" />
      </div>

      {/* Right — Company logo */}
      <div className="flex items-center">
        <Image src={companyLogo} alt="Company logo" height={36} className="object-contain" />
      </div>
    </header>
  );
}
