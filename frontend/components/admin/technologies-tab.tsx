"use client";

import { useEffect, useState } from "react";
import { apiGet, apiSend } from "@/lib/admin-api";
import { ImageUpload } from "@/components/admin/image-upload";
import type { Technology } from "@/lib/types";

const EMPTY: Omit<Technology, "id" | "created_at"> = {
  name: "",
  logo_url: "",
  description: "",
  sort_order: 0
};

export function TechnologiesTab() {
  const [items, setItems] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState(EMPTY);
  const [error, setError] = useState<string | null>(null);

  function load() {
    setLoading(true);
    apiGet<Technology[]>("/api/technologies")
      .then(setItems)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleAdd() {
    if (!draft.name || !draft.description) {
      setError("Name and description are required.");
      return;
    }
    setError(null);
    try {
      await apiSend("/api/technologies", "POST", draft);
      setDraft(EMPTY);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add");
    }
  }

  async function handleUpdate(item: Technology) {
    try {
      await apiSend(`/api/technologies/${item.id}`, "PUT", item);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this technology?")) return;
    await apiSend(`/api/technologies/${id}`, "DELETE");
    load();
  }

  function updateItem(id: string, patch: Partial<Technology>) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-white/10 bg-ink-800 p-5">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-300">Add Technology</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            placeholder="Name"
            value={draft.name}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            className="rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
          />
          <input
            placeholder="Sort order"
            type="number"
            value={draft.sort_order}
            onChange={(e) => setDraft((d) => ({ ...d, sort_order: Number(e.target.value) || 0 }))}
            className="rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
          />
        </div>
        <textarea
          placeholder="Description"
          value={draft.description}
          onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
          rows={2}
          className="mt-4 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
        />
        <div className="mt-4">
          <ImageUpload label="Logo" value={draft.logo_url} onChange={(url) => setDraft((d) => ({ ...d, logo_url: url }))} />
        </div>
        {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
        <button
          onClick={handleAdd}
          className="mt-4 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Add
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading...</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-ink-800 p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  value={item.name}
                  onChange={(e) => updateItem(item.id, { name: e.target.value })}
                  className="rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
                />
                <input
                  type="number"
                  value={item.sort_order}
                  onChange={(e) => updateItem(item.id, { sort_order: Number(e.target.value) || 0 })}
                  className="rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
                />
              </div>
              <textarea
                value={item.description}
                onChange={(e) => updateItem(item.id, { description: e.target.value })}
                rows={2}
                className="mt-4 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
              />
              <div className="mt-4">
                <ImageUpload label="Logo" value={item.logo_url} onChange={(url) => updateItem(item.id, { logo_url: url })} />
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleUpdate(item)}
                  className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-slate-200 hover:border-brand-400/50 hover:text-brand-300"
                >
                  Save
                </button>
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
      )}
    </div>
  );
}
