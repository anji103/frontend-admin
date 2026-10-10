export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 px-6 text-center">
      <h2 className="text-lg font-semibold text-slate-900">Page not found</h2>
      <p className="text-sm text-slate-600">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}
