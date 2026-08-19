"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavCta } from "./NavCta";
import { ThemeToggle } from "./ThemeToggle";

const items = [
  { href: "/apps/", label: "Apps" },
  { href: "/#features", label: "Features" },
  { href: "/about/", label: "About" },
  { href: "/support/", label: "Support" }
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-mist/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <img src="/icon.png" alt="" width={34} height={34} className="h-9 w-9 rounded-xl" />
          AnviLabs
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-mute md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition hover:text-ink ${pathname === item.href ? "text-ink" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <NavCta />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-xl border border-line bg-paper p-2"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-line bg-mist/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <nav className="grid gap-3 text-sm font-medium">
            {items.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4">
            <NavCta />
          </div>
        </div>
      ) : null}
    </header>
  );
}
