import type { Metadata } from "next";
import { studio } from "@/lib/apps";

export const metadata: Metadata = {
  title: "Terms of Service"
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-5xl">Terms of Service</h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-mute">
        <p>
          GradMate is an AnviLabs iOS app. Beta builds may change, break, or be withdrawn. The App Store version, when
          listed, is licensed to you under Apple’s Licensed Application End User License Agreement and these terms.
        </p>
        <p>
          You own the text you enter (tasks, résumé content, chat). You grant AnviLabs a limited license to host that
          content solely to operate GradMate. Do not upload content you do not have the right to use.
        </p>
        <p>
          AnviLabs is not a law firm, career counselor, or employer. ATS formatting helps structure a document; it does
          not guarantee interviews or jobs.
        </p>
        <p>
          Questions:{" "}
          <a className="text-accent underline" href={`mailto:${studio.email}`}>
            {studio.email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
