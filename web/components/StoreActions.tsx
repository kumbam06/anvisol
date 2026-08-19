"use client";

import { useState } from "react";
import { QrModal } from "./QrModal";

type Props = {
  className?: string;
};

export function StoreActions({ className = "" }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-3 rounded-2xl bg-solid px-4 py-2.5 text-solid-fg transition hover:-translate-y-0.5"
        aria-label="Download on the App Store"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
          <path d="M16.7 12.6c0-3 2.5-4.5 2.6-4.6-1.4-2.1-3.6-2.4-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1-1 0-2.5-1.1-4.1-1-2.1.1-4.1 1.3-5.2 3.2-2.2 3.9-.6 9.6 1.6 12.7 1.1 1.6 2.4 3.3 4.1 3.2 1.6-.1 2.3-1.1 4.3-1.1s2.6 1.1 4.3 1c1.8-.1 2.9-1.6 4-3.1 1.2-1.8 1.7-3.5 1.7-3.6-.1 0-3.3-1.3-3.3-5.4zM13.9 4.8c.9-1.1 1.5-2.6 1.3-4.1-1.3.1-2.8.9-3.7 2-.8.9-1.5 2.4-1.3 3.8 1.4.1 2.8-.7 3.7-1.7z" />
        </svg>
        <span className="text-left leading-tight">
          <span className="block text-[10px] uppercase tracking-wide opacity-70">Download on the</span>
          <span className="block text-lg font-semibold">App Store</span>
        </span>
      </button>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5"
      >
        Join Beta
      </button>
      <QrModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
