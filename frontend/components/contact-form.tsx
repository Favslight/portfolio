"use client";

import { useState, type FormEvent } from "react";
import { submitContactMessage } from "@/lib/api";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const contact_info = String(formData.get("contact_info") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !contact_info || !message) {
      setStatus("error");
      setError("Please fill in every field.");
      return;
    }

    setStatus("sending");
    setError(null);

    const result = await submitContactMessage({ name, contact_info, message });

    if (result.ok) {
      setStatus("sent");
      form.reset();
    } else {
      setStatus("error");
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-white/10 bg-ink-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="contact_info" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
            Phone or Email
          </label>
          <input
            id="contact_info"
            name="contact_info"
            type="text"
            required
            className="w-full rounded-xl border border-white/10 bg-ink-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-white/10 bg-ink-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
          placeholder="Tell me a bit about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "sent" ? <p className="text-sm font-medium text-emerald-400">Thanks — your message has been sent!</p> : null}
      {status === "error" ? <p className="text-sm font-medium text-red-400">{error}</p> : null}
    </form>
  );
}
