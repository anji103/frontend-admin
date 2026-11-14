"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/modules/auth/store/auth.store";

/**
 * Left sidebar — collapsed rail by default per design, expands into a nav
 * flyout on hamburger click. Every screen in the Figma file only specifies
 * the collapsed state (a floating rounded card with a hamburger toggle).
 */
export function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  function handleLogout() {
    logout();
    router.push(ROUTES.login);
  }

  return (
    <aside className="relative h-full shrink-0" data-node-id="114:921">
      <div
        className="bg-card flex h-full w-[4.5rem] flex-col items-center gap-4 rounded-2xl p-6"
        style={{ boxShadow: "var(--shadow-header)" }}
      >
        <button
          type="button"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
          className="text-foreground flex size-6 shrink-0 cursor-pointer items-center justify-center"
        >
          <Icon icon="pajamas:hamburger" className="size-6" />
        </button>

        <button
          type="button"
          aria-label="Logout"
          onClick={handleLogout}
          className="text-muted-foreground hover:text-foreground mt-auto flex size-6 shrink-0 cursor-pointer items-center justify-center"
        >
          <Icon icon="mynaui:logout" className="size-6" />
        </button>
      </div>

      <nav
        inert={!expanded}
        aria-hidden={!expanded}
        className={`bg-card border-border absolute top-0 left-0 z-[var(--z-dropdown)] flex h-full w-56 origin-top-left flex-col rounded-2xl border p-4 pt-[4.5rem] shadow-lg transition-[opacity,transform] duration-[--transition-base] ease-out ${
          expanded ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Collapse sidebar"
          aria-expanded={expanded}
          onClick={() => setExpanded(false)}
          className="text-foreground absolute top-6 left-6 flex size-6 shrink-0 cursor-pointer items-center justify-center"
        >
          <Icon icon="pajamas:hamburger" className="size-6" />
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="text-muted-foreground hover:bg-accent hover:text-foreground mt-auto flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium whitespace-nowrap transition-colors duration-[--transition-base]"
        >
          <Icon icon="mynaui:logout" className="size-4" />
          Logout
        </button>
      </nav>
    </aside>
  );
}
