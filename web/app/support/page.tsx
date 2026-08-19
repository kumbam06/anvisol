import type { Metadata } from "next";
import { Mail, Github } from "lucide-react";
import { studio } from "@/lib/apps";

export const metadata: Metadata = {
  title: "Support"
};

export default function SupportPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Help</p>
      <h1 className="mt-2 font-display text-5xl">Support</h1>
      <p className="mt-4 text-mute">
        GradMate questions, beta access, and privacy requests all go to the studio inbox. We read mail ourselves.
      </p>
      <div className="mt-10 grid gap-4">
        <a
          className="flex items-center gap-3 rounded-3xl border border-line bg-paper p-5 shadow-card transition hover:-translate-y-0.5"
          href={`mailto:${studio.email}`}
        >
          <Mail className="text-accent" />
          <span>
            <strong className="block">Email</strong>
            <span className="text-sm text-mute">{studio.email}</span>
          </span>
        </a>
        <a
          className="flex items-center gap-3 rounded-3xl border border-line bg-paper p-5 shadow-card transition hover:-translate-y-0.5"
          href={studio.trackedRepo}
          target="_blank"
          rel="noreferrer"
        >
          <Github className="text-accent" />
          <span>
            <strong className="block">GradMate source</strong>
            <span className="text-sm text-mute">github.com/kumbam06/TrackEd</span>
          </span>
        </a>
      </div>
    </main>
  );
}
