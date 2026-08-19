import Link from "next/link";
import { Github, Mail } from "lucide-react";
import { studio } from "@/lib/apps";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">AnviLabs</p>
          <p className="mt-2 max-w-xs text-sm text-mute">
            Independent product studio. We ship our own iOS apps, starting with GradMate.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Legal</p>
          <ul className="mt-3 grid gap-2 text-mute">
            <li>
              <Link className="hover:text-ink" href="/privacy/">
                Privacy Policy
              </Link>
              <span className="mt-1 block text-xs">Career data stays yours — see how we handle résumés and chat.</span>
            </li>
            <li>
              <Link className="hover:text-ink" href="/terms/">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Support &amp; socials</p>
          <ul className="mt-3 grid gap-2 text-mute">
            <li>
              <a className="inline-flex items-center gap-2 hover:text-ink" href={`mailto:${studio.email}`}>
                <Mail size={16} /> {studio.email}
              </a>
            </li>
            <li>
              <Link className="hover:text-ink" href="/#about">
                About the studio
              </Link>
            </li>
            <li>
              <Link className="hover:text-ink" href="/support/">
                Support center
              </Link>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 hover:text-ink" href={studio.github} target="_blank" rel="noreferrer">
                <Github size={16} /> GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-line px-4 py-4 text-center text-xs text-mute">
        © {year} AnviLabs. GradMate is an AnviLabs product.
      </p>
    </footer>
  );
}
