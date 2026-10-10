"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 px-6 text-center">
      <h2 className="text-lg font-semibold text-slate-900">
        Something went wrong.
      </h2>
      <button
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
