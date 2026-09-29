export type Profile = {
  id: number;
  name: string;
  title: string;
  tagline: string;
  bio: string;
  years_experience: number;
  profile_image_url: string | null;
  secondary_image_url: string | null;
  linkedin_url: string | null;
  email: string | null;
  updated_at: string;
};

export type Technology = {
  id: string;
  name: string;
  logo_url: string | null;
  description: string;
  sort_order: number;
  created_at: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  stack: string[];
  role: "Full Stack" | "Backend";
  link: string | null;
  image_url: string | null;
  backend_percent: number;
  frontend_percent: number;
  is_private: boolean;
  sort_order: number;
  created_at: string;
};

export type OngoingProject = {
  id: string;
  name: string;
  description: string;
  stack: string[];
  status: string;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  contact_info: string;
  message: string;
  read: boolean;
  created_at: string;
};
