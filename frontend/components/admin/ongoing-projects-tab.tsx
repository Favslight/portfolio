"use client";

import { useEffect, useState } from "react";
import { apiGet, apiSend } from "@/lib/admin-api";
import type { OngoingProject } from "@/lib/types";

type Draft = {
  name: string;
  description: string;
  stack: string;
  status: string;
};

const EMPTY: Draft = { name: "", description: "", stack: "", status: "In Progress" };

function toStackArray(value: string) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function OngoingProjectsTab() {
  const [items, setItems] = useState<OngoingProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [error, setError] = useState<string | null>(null);

  function load() {
    setLoading(true);
    apiGet<OngoingProject[]>("/api/ongoing-projects")
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
      await apiSend("/api/ongoing-projects", "POST", {
        name: draft.name,
        description: draft.description,
        stack: toStackArray(draft.stack),
        status: draft.status
      });
      setDraft(EMPTY);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add");
    }
  }

  async function handleUpdate(item: OngoingProject) {
    try {
      await apiSend(`/api/ongoing-projects/${item.id}`, "PUT", item);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this ongoing project?")) return;
    await apiSend(`/api/ongoing-projects/${id}`, "DELETE");
    load();
  }

  function updateItem(id: string, patch: Partial<OngoingProject>) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-white/10 bg-ink-800 p-5">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-300">Add Ongoing Project</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            placeholder="Name"
            value={draft.name}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            className="rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
          />
          <input
            placeholder="Status (e.g. In Progress)"
            value={draft.status}
            onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value }))}
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
        <input
          placeholder="Stack (comma separated, optional)"
          value={draft.stack}
          onChange={(e) => setDraft((d) => ({ ...d, stack: e.target.value }))}
          className="mt-4 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
        />
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
      ) : items.length === 0 ? (
        <p className="text-sm text-slate-400">No ongoing projects yet.</p>
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
                  value={item.status}
                  onChange={(e) => updateItem(item.id, { status: e.target.value })}
                  className="rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
                />
              </div>
              <textarea
                value={item.description}
                onChange={(e) => updateItem(item.id, { description: e.target.value })}
                rows={2}
                className="mt-4 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
              />
              <input
                value={item.stack.join(", ")}
                onChange={(e) => updateItem(item.id, { stack: toStackArray(e.target.value) })}
                className="mt-4 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
              />
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
