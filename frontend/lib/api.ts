import type { ContactMessage, OngoingProject, Profile, Project, Technology } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getProfile(): Promise<Profile | null> {
  return getJson<Profile>("/api/profile");
}

export async function getTechnologies(): Promise<Technology[]> {
  return (await getJson<Technology[]>("/api/technologies")) ?? [];
}

export async function getProjects(): Promise<Project[]> {
  return (await getJson<Project[]>("/api/projects")) ?? [];
}

export async function getOngoingProjects(): Promise<OngoingProject[]> {
  return (await getJson<OngoingProject[]>("/api/ongoing-projects")) ?? [];
}

export async function submitContactMessage(payload: {
  name: string;
  contact_info: string;
  message: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, error: body.error ?? "Something went wrong. Please try again." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not reach the server. Please try again later." };
  }
}

export type { ContactMessage, OngoingProject, Profile, Project, Technology };
export { API_URL };
