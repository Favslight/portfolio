import Link from "next/link";
import type { Profile } from "@/lib/types";

export function Footer({ profile }: { profile: Profile | null }) {
  const name = profile?.name || "Portfolio";
  const title = profile?.title || "Full Stack Developer";

  return (
    <footer className="mt-8 border-t border-white/10 py-8">
      <p className="text-sm font-semibold text-white">{name}</p>
      <p className="mt-1 text-sm text-slate-400">{title} building scalable systems and AI-driven platforms.</p>
      <p className="mt-3 text-xs text-slate-500">
        <Link href="/admin/login" className="hover:text-slate-400" title="Admin">
          ©
        </Link>{" "}
        {new Date().getFullYear()} {name}. All rights reserved.
      </p>
    </footer>
  );
}
