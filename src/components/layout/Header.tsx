export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Overview</p>
          <h1 className="text-xl font-semibold text-slate-900">Admin Panel</h1>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
          System ready
        </div>
      </div>
    </header>
  );
}
