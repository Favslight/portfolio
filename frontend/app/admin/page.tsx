"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clearToken } from "@/lib/admin-api";
import { ProfileTab } from "@/components/admin/profile-tab";
import { TechnologiesTab } from "@/components/admin/technologies-tab";
import { ProjectsTab } from "@/components/admin/projects-tab";
import { OngoingProjectsTab } from "@/components/admin/ongoing-projects-tab";
import { MessagesTab } from "@/components/admin/messages-tab";

const TABS = [
  { key: "profile", label: "Profile" },
  { key: "technologies", label: "Tech Stack" },
  { key: "projects", label: "Projects" },
  { key: "ongoing", label: "Ongoing Projects" },
  { key: "messages", label: "Messages" }
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<TabKey>("profile");
  const router = useRouter();

  function handleLogout() {
    clearToken();
    router.push("/admin/login");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-sm text-slate-400">Manage everything shown on your portfolio.</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-red-400/50 hover:text-red-400"
        >
          Log out
        </button>
      </div>

      <div className="mb-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              tab === t.key ? "bg-gradient-to-r from-brand-500 to-accent-500 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "profile" ? <ProfileTab /> : null}
      {tab === "technologies" ? <TechnologiesTab /> : null}
      {tab === "projects" ? <ProjectsTab /> : null}
      {tab === "ongoing" ? <OngoingProjectsTab /> : null}
      {tab === "messages" ? <MessagesTab /> : null}
    </div>
  );
}
