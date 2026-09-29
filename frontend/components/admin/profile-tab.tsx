"use client";

import { useEffect, useState } from "react";
import { apiGet, apiSend } from "@/lib/admin-api";
import { ImageUpload } from "@/components/admin/image-upload";
import type { Profile } from "@/lib/types";

export function ProfileTab() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    apiGet<Profile>("/api/profile")
      .then(setProfile)
      .finally(() => setLoading(false));
  }, []);

  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    setProfile((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  async function handleSave() {
    if (!profile) return;
    setSaving(true);
    setMessage(null);
    try {
      const updated = await apiSend<Profile>("/api/profile", "PUT", {
        name: profile.name,
        title: profile.title,
        tagline: profile.tagline,
        bio: profile.bio,
        years_experience: Number(profile.years_experience),
        profile_image_url: profile.profile_image_url,
        secondary_image_url: profile.secondary_image_url,
        linkedin_url: profile.linkedin_url,
        email: profile.email
      });
      if (updated) setProfile(updated);
      setMessage("Saved.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-sm text-slate-400">Loading...</p>;
  if (!profile) return <p className="text-sm text-red-400">Could not load profile.</p>;

  return (
    <div className="max-w-2xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" value={profile.name} onChange={(v) => update("name", v)} />
        <Field label="Title" value={profile.title} onChange={(v) => update("title", v)} />
      </div>

      <Field label="Tagline" value={profile.tagline} onChange={(v) => update("tagline", v)} />

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Bio</label>
        <textarea
          value={profile.bio}
          onChange={(e) => update("bio", e.target.value)}
          rows={6}
          className="w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field
          label="Years Experience"
          value={String(profile.years_experience)}
          onChange={(v) => update("years_experience", Number(v) || 0)}
          type="number"
        />
        <Field label="LinkedIn URL" value={profile.linkedin_url ?? ""} onChange={(v) => update("linkedin_url", v)} />
        <Field label="Contact Email" value={profile.email ?? ""} onChange={(v) => update("email", v)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUpload label="Profile Image" value={profile.profile_image_url} onChange={(url) => update("profile_image_url", url)} />
        <ImageUpload
          label="Secondary Image"
          value={profile.secondary_image_url}
          onChange={(url) => update("secondary_image_url", url)}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {message ? <p className="text-sm text-slate-300">{message}</p> : null}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-brand-400 focus:outline-none"
      />
    </div>
  );
}
