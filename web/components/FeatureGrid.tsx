import { FileText, Timer, MessagesSquare } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "1-click resume & cover letter engine",
    body: "ATS-optimized résumés and cover letters from the skills, certifications, internships, and experience already in your GradMate profile. Export a PDF when you are ready to apply."
  },
  {
    icon: Timer,
    title: "Productivity & focus",
    body: "A deadline-aware task scheduler plus a Pomodoro timer with work and break blocks — so study sessions and career admin share one list."
  },
  {
    icon: MessagesSquare,
    title: "Peer network",
    body: "In-app study-buddy chat on Firestore, with push notifications when a classmate replies. Keep homework talk off group SMS."
  }
];

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Flagship features</p>
      <h2 className="mt-2 font-display text-4xl">What GradMate does</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-3xl border border-line bg-paper p-6 shadow-card">
            <feature.icon className="text-accent" size={28} strokeWidth={1.6} />
            <h3 className="mt-5 font-display text-2xl leading-tight">{feature.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mute">{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
