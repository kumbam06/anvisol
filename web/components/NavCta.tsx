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
        className="rounded-full bg-solid px-5 py-2.5 text-sm font-semibold text-solid-fg transition hover:bg-accent hover:text-white"
      >
        Join Beta
      </button>
      <QrModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
