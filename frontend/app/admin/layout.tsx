"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getToken } from "@/lib/admin-api";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setReady(true);
      return;
    }
    if (!getToken()) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [isLoginPage, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-950 text-sm text-slate-400">Loading...</div>
    );
  }

  return <div className="min-h-screen bg-ink-950 text-slate-100">{children}</div>;
}
