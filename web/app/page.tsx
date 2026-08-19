import { AppHub } from "@/components/AppHub";
import { FeatureGrid } from "@/components/FeatureGrid";
import { PhoneMock } from "@/components/PhoneMock";
import { StoreActions } from "@/components/StoreActions";

export default function HomePage() {
  return (
    <main>
      <section id="gradmate" className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-12 pt-16 md:grid-cols-2 md:pt-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">AnviLabs product studio</p>
          <h1 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">
            GradMate. Career docs, focus, and study chat — on iPhone.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-mute">
            One tap for an ATS-ready resume and cover letter. A Pomodoro timer on top of a deadline-aware task list.
            Peer study chat when you need a buddy, not another group thread.
          </p>
          <StoreActions className="mt-8" />
          <p className="mt-4 text-sm text-mute">Scan the QR from Join Beta or the App Store badge with your iPhone.</p>
        </div>
        <PhoneMock />
      </section>
      <FeatureGrid />
      <AppHub />
    </main>
  );
}
