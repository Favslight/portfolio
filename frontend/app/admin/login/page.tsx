"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/admin-api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink-950 px-4">
      <Link
        href="/"
        className="flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-brand-300"
      >
        ← Back to Home
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-ink-800 p-8 shadow-soft"
      >
        <h1 className="text-xl font-bold text-white">Admin Login</h1>
        <p className="mt-1 text-sm text-slate-400">Sign in to manage your portfolio content.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
            />
          </div>
        </div>

        {error ? <p className="mt-4 text-sm font-medium text-red-400">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <Link href="/" className="text-xs text-slate-500 transition-colors hover:text-brand-300">
        © {new Date().getFullYear()} Lighthold. All rights reserved.
      </Link>
    </div>
  );
}
