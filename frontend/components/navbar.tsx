"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/logo";

const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#ongoing", label: "Ongoing" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-4 z-40">
      <nav className="mx-auto flex max-w-4xl items-center justify-between rounded-full border border-white/10 bg-ink-800/80 px-4 py-2.5 shadow-soft backdrop-blur-md sm:px-6">
        <Link href="#top">
          <LogoMark />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-xs font-medium uppercase tracking-wide text-slate-300 transition-colors hover:text-brand-300">
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 md:inline-flex"
        >
          Let&apos;s Talk
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-slate-200 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open ? (
        <div className="mx-auto mt-2 flex max-w-4xl flex-col gap-1 rounded-2xl border border-white/10 bg-ink-800/95 p-4 shadow-soft backdrop-blur-md md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-brand-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
