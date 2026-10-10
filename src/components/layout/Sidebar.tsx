import Link from "next/link";

import { ROUTES } from "@/constants/routes";

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50 p-6">
      <h2 className="text-lg font-semibold text-slate-900">OHMIND Admin</h2>
      <nav className="mt-6 space-y-2">
        <Link
          className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
          href={ROUTES.dashboard}
        >
          Dashboard
        </Link>
        <Link
          className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
          href={ROUTES.login}
        >
          Login
        </Link>
      </nav>
    </aside>
  );
}
