"use client";

import { API_URL } from "./api";

const TOKEN_KEY = "portfolio_admin_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body.error ?? "Login failed");
  }
  setToken(body.token);
  return body.token as string;
}

async function authedFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers ?? {}),
      Authorization: `Bearer ${token ?? ""}`
    }
  });

  if (res.status === 401) {
    clearToken();
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
    throw new Error("Session expired, please log in again");
  }

  return res;
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await authedFetch(path);
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

export async function apiSend<T>(path: string, method: "POST" | "PUT" | "DELETE", body?: unknown): Promise<T | null> {
  const res = await authedFetch(path, {
    method,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.error ?? `${method} ${path} failed`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function uploadImage(file: File): Promise<string> {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/api/uploads`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token ?? ""}` },
    body: formData
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body.error ?? "Upload failed");
  }
  return body.url as string;
}
