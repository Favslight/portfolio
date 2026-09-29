"use client";

import { useEffect, useState } from "react";
import { apiGet, apiSend } from "@/lib/admin-api";
import type { ContactMessage } from "@/lib/types";

export function MessagesTab() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    apiGet<ContactMessage[]>("/api/contact")
      .then(setItems)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function markRead(id: string) {
    await apiSend(`/api/contact/${id}/read`, "PUT");
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;
    await apiSend(`/api/contact/${id}`, "DELETE");
    load();
  }

  if (loading) return <p className="text-sm text-slate-400">Loading...</p>;
  if (items.length === 0) return <p className="text-sm text-slate-400">No messages yet.</p>;

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className={`rounded-2xl border p-5 ${
            item.read ? "border-white/10 bg-ink-800" : "border-brand-400/40 bg-brand-500/5"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-white">{item.name}</p>
              <p className="text-xs text-slate-400">{item.contact_info}</p>
            </div>
            <p className="text-xs text-slate-500">{new Date(item.created_at).toLocaleString()}</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.message}</p>
          <div className="mt-4 flex gap-3">
            {!item.read ? (
              <button
                onClick={() => markRead(item.id)}
                className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-slate-200 hover:border-brand-400/50 hover:text-brand-300"
              >
                Mark as read
              </button>
            ) : null}
            <button
              onClick={() => handleDelete(item.id)}
              className="rounded-full border border-red-500/30 px-4 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/10"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
