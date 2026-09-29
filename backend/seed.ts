import "dotenv/config";
import { pool } from "./src/db.js";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH!;

const technologies = [
  { name: "Next.js", logo_url: "/logos/next-logo.png", description: "Production-grade React framework for high-performance, SEO-friendly web apps.", sort_order: 1 },
  { name: "Node.js", logo_url: "/logos/nodejs.png", description: "Backend runtime for scalable APIs, services, and event-driven architectures.", sort_order: 2 },
  { name: "TypeScript", logo_url: "/logos/typescript.png", description: "Strong typing for safer refactoring, cleaner contracts, and robust systems.", sort_order: 3 },
  { name: "JavaScript", logo_url: "/logos/javascript.png", description: "Core language for modern web development across client and server execution.", sort_order: 4 },
  { name: "PostgreSQL", logo_url: "/logos/postgresql.png", description: "Reliable relational database for transactional integrity and performance tuning.", sort_order: 5 },
  { name: "MongoDB", logo_url: "/logos/mongodb.png", description: "Flexible document database for evolving schemas and high-velocity product needs.", sort_order: 6 },
  { name: "Supabase", logo_url: "/logos/supabase.jpg", description: "Managed PostgreSQL platform with auth, storage, and real-time capabilities.", sort_order: 7 },
  { name: "MQTT", logo_url: "/logos/mqtt.png", description: "Lightweight pub/sub protocol for real-time IoT messaging and device communication.", sort_order: 8 },
  { name: "Redis", logo_url: "/logos/redis.png", description: "In-memory data store for caching, queues, and low-latency system performance.", sort_order: 9 }
];

const projects = [
  {
    name: "cbrixi.com",
    description: "End-to-end platform delivery covering product UX, backend architecture, and deployment workflows.",
    stack: ["Next.js", "Node.js (TypeScript)", "PostgreSQL"],
    role: "Full Stack",
    link: "https://cbrixi.com",
    backend_percent: 50,
    frontend_percent: 50,
    is_private: false,
    sort_order: 1
  },
  {
    name: "gatewav.com",
    description: "Backend engineering for dependable API flows, domain modeling, and system reliability.",
    stack: ["Node.js (JavaScript)", "PostgreSQL"],
    role: "Backend",
    link: "https://gatewav.com",
    backend_percent: 100,
    frontend_percent: 0,
    is_private: false,
    sort_order: 2
  },
  {
    name: "genius.ng",
    description: "Scalable backend systems focused on typed services, data consistency, and maintainable APIs.",
    stack: ["Node.js (TypeScript)", "PostgreSQL"],
    role: "Backend",
    link: "https://genius.ng",
    backend_percent: 100,
    frontend_percent: 0,
    is_private: false,
    sort_order: 3
  },
  {
    name: "knowrist.com",
    description: "Backend platform development with emphasis on speed, uptime, and structured service boundaries.",
    stack: ["Node.js (TypeScript)", "PostgreSQL"],
    role: "Backend",
    link: "https://knowrist.com",
    backend_percent: 100,
    frontend_percent: 0,
    is_private: false,
    sort_order: 4
  },
  {
    name: "dashdiiorganic.ng",
    description: "Full stack implementation unifying modern frontend experiences with resilient backend services.",
    stack: ["Next.js", "Node.js (TypeScript)", "PostgreSQL"],
    role: "Full Stack",
    link: "https://dashdiiorganic.ng",
    backend_percent: 50,
    frontend_percent: 50,
    is_private: false,
    sort_order: 5
  },
  {
    name: "joscity.com",
    description: "Backend architecture for real-world product operations, reporting, and service orchestration.",
    stack: ["Node.js (JavaScript)", "PostgreSQL"],
    role: "Backend",
    link: "https://joscity.com",
    backend_percent: 100,
    frontend_percent: 0,
    is_private: false,
    sort_order: 6
  },
  {
    name: "P.H.I.M.S",
    description: "Private healthcare information management system with secure data handling workflows.",
    stack: ["Node.js (JavaScript)", "MongoDB"],
    role: "Backend",
    link: null,
    backend_percent: 100,
    frontend_percent: 0,
    is_private: true,
    sort_order: 7
  }
];

async function seed() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD_HASH must be set in backend/.env");
  }

  await pool.query(
    `INSERT INTO admins (email, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
    [ADMIN_EMAIL.toLowerCase().trim(), ADMIN_PASSWORD_HASH]
  );
  console.log("Seeded admin:", ADMIN_EMAIL);

  await pool.query(
    `INSERT INTO profile (id, name, title, tagline, bio, years_experience, profile_image_url, secondary_image_url, linkedin_url, email)
     VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (id) DO UPDATE SET
       name = EXCLUDED.name,
       title = EXCLUDED.title,
       tagline = EXCLUDED.tagline,
       bio = EXCLUDED.bio,
       years_experience = EXCLUDED.years_experience,
       linkedin_url = EXCLUDED.linkedin_url,
       email = EXCLUDED.email`,
    [
      "Samuel Ebiloma",
      "Full Stack Developer",
      "Turning ambitious ideas into fast, reliable, production-ready software.",
      "I'm a backend-focused Full Stack Developer who builds software people can actually rely on. Over the years I've architected APIs, databases, and services for platforms handling real users, real payments, and real growth — then paired that engineering with an eye for design shaped by my background in Graphics Design and UI/UX. That combination means I don't just ship features; I ship systems that scale, interfaces that feel effortless, and products that hold up under pressure. Right now, I'm channeling that same rigor into AI-powered platforms and intelligent automation — building the kind of software that quietly does the heavy lifting so businesses can move faster.",
      3,
      "/profile.jpg",
      "/profile.jpg",
      "https://www.linkedin.com/in/samuel-light-ebiloma-9702a41b4",
      "samuelebiloma208@gmail.com"
    ]
  );
  console.log("Seeded profile");

  for (const tech of technologies) {
    await pool.query(
      `INSERT INTO technologies (name, logo_url, description, sort_order)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (name) DO UPDATE SET logo_url = EXCLUDED.logo_url, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order`,
      [tech.name, tech.logo_url, tech.description, tech.sort_order]
    );
  }
  console.log("Seeded technologies:", technologies.length);

  for (const project of projects) {
    await pool.query(
      `INSERT INTO projects (name, description, stack, role, link, backend_percent, frontend_percent, is_private, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (name) DO UPDATE SET
         description = EXCLUDED.description,
         stack = EXCLUDED.stack,
         role = EXCLUDED.role,
         link = EXCLUDED.link,
         backend_percent = EXCLUDED.backend_percent,
         frontend_percent = EXCLUDED.frontend_percent,
         is_private = EXCLUDED.is_private,
         sort_order = EXCLUDED.sort_order`,
      [
        project.name,
        project.description,
        project.stack,
        project.role,
        project.link,
        project.backend_percent,
        project.frontend_percent,
        project.is_private,
        project.sort_order
      ]
    );
  }
  console.log("Seeded projects:", projects.length);

  console.log("Seed complete.");
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
