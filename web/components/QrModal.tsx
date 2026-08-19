"use client";

import { QRCodeSVG } from "qrcode.react";
import { X } from "lucide-react";
import { studio } from "@/lib/apps";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function QrModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-labelledby="qr-title"
        className="w-full max-w-sm rounded-3xl bg-paper p-6 shadow-card"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">GradMate beta</p>
            <h2 id="qr-title" className="mt-1 font-display text-2xl">
              Scan with iPhone to download
            </h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-mist" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="grid place-items-center rounded-2xl border border-line bg-white p-5">
          <QRCodeSVG value={`${studio.site}/apps/`} size={196} bgColor="#ffffff" fgColor="#12141a" />
        </div>
        <p className="mt-4 text-sm text-mute">
          Opens the GradMate page on anvilabs.com. Join the TestFlight beta from there, or email{" "}
          <a className="text-accent underline" href={`mailto:${studio.email}`}>
            {studio.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
