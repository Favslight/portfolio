"use client";

import { useEffect, useState } from "react";
import { apiGet, apiSend } from "@/lib/admin-api";
import { ImageUpload } from "@/components/admin/image-upload";
import type { Project } from "@/lib/types";

type Draft = {
  name: string;
  description: string;
  stack: string;
  role: "Full Stack" | "Backend";
  link: string;
  image_url: string;
  backend_percent: number;
  is_private: boolean;
  sort_order: number;
};

const EMPTY: Draft = {
  name: "",
  description: "",
  stack: "",
  role: "Backend",
  link: "",
  image_url: "",
  backend_percent: 100,
  is_private: false,
  sort_order: 0
};

function toStackArray(value: string) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function ProjectsTab() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [error, setError] = useState<string | null>(null);

  function load() {
    setLoading(true);
    apiGet<Project[]>("/api/projects")
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
      await apiSend("/api/projects", "POST", {
        name: draft.name,
        description: draft.description,
        stack: toStackArray(draft.stack),
        role: draft.role,
        link: draft.link || null,
        image_url: draft.image_url || null,
        backend_percent: draft.backend_percent,
        frontend_percent: 100 - draft.backend_percent,
        is_private: draft.is_private,
        sort_order: draft.sort_order
      });
      setDraft(EMPTY);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add");
    }
  }

  async function handleUpdate(item: Project) {
    try {
      await apiSend(`/api/projects/${item.id}`, "PUT", item);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await apiSend(`/api/projects/${id}`, "DELETE");
    load();
  }

  function updateItem(id: string, patch: Partial<Project>) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-white/10 bg-ink-800 p-5">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-300">Add Project</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            placeholder="Name"
            value={draft.name}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            className="rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
          />
          <input
            placeholder="Live link (optional)"
            value={draft.link}
            onChange={(e) => setDraft((d) => ({ ...d, link: e.target.value }))}
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
          placeholder="Stack (comma separated, e.g. Next.js, PostgreSQL)"
          value={draft.stack}
          onChange={(e) => setDraft((d) => ({ ...d, stack: e.target.value }))}
          className="mt-4 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
        />

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <select
            value={draft.role}
            onChange={(e) => setDraft((d) => ({ ...d, role: e.target.value as Draft["role"] }))}
            className="rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
          >
            <option value="Backend">Backend</option>
            <option value="Full Stack">Full Stack</option>
          </select>
          <input
            placeholder="Sort order"
            type="number"
            value={draft.sort_order}
            onChange={(e) => setDraft((d) => ({ ...d, sort_order: Number(e.target.value) || 0 }))}
            className="rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
          />
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={draft.is_private}
              onChange={(e) => setDraft((d) => ({ ...d, is_private: e.target.checked }))}
            />
            Private project
          </label>
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
            Backend / Frontend split — {draft.backend_percent}% backend / {100 - draft.backend_percent}% frontend
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={draft.backend_percent}
            onChange={(e) => setDraft((d) => ({ ...d, backend_percent: Number(e.target.value) }))}
            className="w-full"
          />
        </div>

        <div className="mt-4">
          <ImageUpload label="Screenshot" value={draft.image_url} onChange={(url) => setDraft((d) => ({ ...d, image_url: url }))} />
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
                  value={item.link ?? ""}
                  onChange={(e) => updateItem(item.id, { link: e.target.value })}
                  placeholder="Live link"
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

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <select
                  value={item.role}
                  onChange={(e) => updateItem(item.id, { role: e.target.value as Project["role"] })}
                  className="rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
                >
                  <option value="Backend">Backend</option>
                  <option value="Full Stack">Full Stack</option>
                </select>
                <input
                  type="number"
                  value={item.sort_order}
                  onChange={(e) => updateItem(item.id, { sort_order: Number(e.target.value) || 0 })}
                  className="rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
                />
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={item.is_private}
                    onChange={(e) => updateItem(item.id, { is_private: e.target.checked })}
                  />
                  Private project
                </label>
              </div>

              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Backend / Frontend split — {item.backend_percent}% backend / {item.frontend_percent}% frontend
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={item.backend_percent}
                  onChange={(e) =>
                    updateItem(item.id, {
                      backend_percent: Number(e.target.value),
                      frontend_percent: 100 - Number(e.target.value)
                    })
                  }
                  className="w-full"
                />
              </div>

              <div className="mt-4">
                <ImageUpload label="Screenshot" value={item.image_url} onChange={(url) => updateItem(item.id, { image_url: url })} />
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
