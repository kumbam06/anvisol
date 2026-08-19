import type { Metadata } from "next";
import { studio } from "@/lib/apps";

export const metadata: Metadata = {
  title: "Privacy Policy"
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-5xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-mute">Last updated {new Date().getFullYear()}. App Store–oriented notice for GradMate.</p>

      <section className="mt-10 rounded-3xl border border-accent/30 bg-blue-50/60 p-6">
        <h2 className="font-display text-2xl">Career data</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink">
          Résumés, cover letters, skills, certifications, internships, and work history exist so you can apply for jobs
          and internships. AnviLabs does not sell this career data, does not use it to train third-party models, and
          does not show it to other students unless you share a profile or send a chat message yourself.
        </p>
      </section>

      <div className="prose-anvi mt-8 space-y-6 text-sm leading-relaxed text-mute">
        <p>
          GradMate stores profile and planner data on device with Core Data and syncs signed-in accounts to Firebase
          (Authentication, Firestore, Storage, Cloud Messaging) so chat and backups work. Access is limited to your
          user ID under Firestore security rules.
        </p>
        <p>
          Study chat is visible to people in that conversation. Do not paste secrets or government ID numbers into chat
          or into a résumé field.
        </p>
        <p>
          To export or delete your account data, email{" "}
          <a className="text-accent underline" href={`mailto:${studio.email}`}>
            {studio.email}
          </a>
          . We will confirm the Apple or Google identity on the account before changing records.
        </p>
        <p>This website may store a theme or demo preference in your browser. It is not used for advertising.</p>
      </div>
    </main>
  );
}
