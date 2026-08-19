import Link from "next/link";
import { studio } from "@/lib/apps";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-line bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">About</p>
          <h2 className="mt-2 font-display text-4xl">An independent iOS lab, not an agency.</h2>
          <p className="mt-4 text-mute">
            AnviLabs designs, builds, and ships its own apps. We do not sell websites, retainers, or client campaigns.
            GradMate is the first product out of the studio; North and Harbor are still in the lab.
          </p>
          <p className="mt-4 text-mute">
            The studio is led by Pradeep Reddy Kumbam. Product, design, and Swift live in the same loop so a résumé
            field and a chat thread stay consistent on device.
          </p>
        </div>
        <aside className="rounded-3xl border border-line bg-mist p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mute">{studio.site.replace("https://", "")}</p>
          <h3 className="mt-2 font-display text-2xl">Studio facts</h3>
          <ul className="mt-4 grid gap-3 text-sm text-mute">
            <li>
              <strong className="text-ink">Kind</strong> — Independent product studio
            </li>
            <li>
              <strong className="text-ink">Flagship</strong> — GradMate for iPhone
            </li>
            <li>
              <strong className="text-ink">Stack</strong> — SwiftUI, Core Data, Firebase
            </li>
            <li>
              <strong className="text-ink">Contact</strong> —{" "}
              <a className="text-accent underline" href={`mailto:${studio.email}`}>
                {studio.email}
              </a>
            </li>
          </ul>
          <Link href="/apps/" className="mt-6 inline-block text-sm font-semibold text-accent">
            See the app hub →
          </Link>
        </aside>
      </div>
    </section>
  );
}
