import "dotenv/config";
import { pool } from "./src/db.js";

const statements = [
  `CREATE EXTENSION IF NOT EXISTS "pgcrypto"`,

  `CREATE TABLE IF NOT EXISTS admins (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text UNIQUE NOT NULL,
    password_hash text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS profile (
    id smallint PRIMARY KEY DEFAULT 1,
    name text NOT NULL DEFAULT '',
    title text NOT NULL DEFAULT '',
    tagline text NOT NULL DEFAULT '',
    bio text NOT NULL DEFAULT '',
    years_experience integer NOT NULL DEFAULT 0,
    profile_image_url text,
    secondary_image_url text,
    linkedin_url text,
    email text,
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT profile_singleton CHECK (id = 1)
  )`,

  `CREATE TABLE IF NOT EXISTS technologies (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL UNIQUE,
    logo_url text,
    description text NOT NULL,
    sort_order integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL UNIQUE,
    description text NOT NULL,
    stack text[] NOT NULL DEFAULT '{}',
    role text NOT NULL CHECK (role IN ('Full Stack', 'Backend')),
    link text,
    image_url text,
    backend_percent integer NOT NULL DEFAULT 100,
    frontend_percent integer NOT NULL DEFAULT 0,
    is_private boolean NOT NULL DEFAULT false,
    sort_order integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS ongoing_projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text NOT NULL,
    stack text[] NOT NULL DEFAULT '{}',
    status text NOT NULL DEFAULT 'In Progress',
    created_at timestamptz NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS contact_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    contact_info text NOT NULL,
    message text NOT NULL,
    read boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now()
  )`
];

async function migrate() {
  for (const statement of statements) {
    await pool.query(statement);
    console.log("OK:", statement.trim().split("\n")[0]);
  }
  console.log("Migration complete.");
  await pool.end();
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
