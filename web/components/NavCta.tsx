"use client";

import { useState } from "react";
import { QrModal } from "./QrModal";

export function NavCta() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent"
      >
        Join Beta
      </button>
      <QrModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
