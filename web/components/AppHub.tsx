import Link from "next/link";
import { apps } from "@/lib/apps";

export function AppHub() {
  return (
    <section id="apps" className="mx-auto max-w-6xl px-4 py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Product hub</p>
      <h2 className="mt-2 font-display text-4xl">Apps from the lab</h2>
      <p className="mt-3 max-w-xl text-mute">
        GradMate is live in beta. Two more iOS tools are in the studio. Same brand, separate products.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {apps.map((app) => (
          <article
            key={app.slug}
            className="rounded-3xl border border-line bg-paper p-6 shadow-card transition duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  app.status === "active" ? "bg-accent/15 text-accent" : "bg-mist text-mute"
                }`}
              >
                {app.status === "active" ? "iOS · Active" : "Coming soon / In Lab"}
              </span>
              <span className="text-xs text-mute">{app.platform}</span>
            </div>
            <h3 className="mt-5 font-display text-2xl">{app.name}</h3>
            <p className="mt-2 text-sm text-mute">{app.summary}</p>
            <Link href={app.href} className="mt-6 inline-block text-sm font-semibold text-accent">
              {app.status === "active" ? "Open GradMate →" : "In the lab"}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
