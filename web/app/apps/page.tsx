import type { Metadata } from "next";
import { AppHub } from "@/components/AppHub";

export const metadata: Metadata = {
  title: "Apps"
};

export default function AppsPage() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Catalog</p>
        <h1 className="mt-2 font-display text-5xl">Every AnviLabs app</h1>
        <p className="mt-4 max-w-2xl text-mute">
          We do not take client retainers or sell website packages. This hub is only for products we design, ship, and
          own.
        </p>
      </div>
      <AppHub />
    </main>
  );
}
