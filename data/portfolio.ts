export type Technology = {
  name: string;
  logo: string;
  description: string;
};

export type Project = {
  name: string;
  description: string;
  stack: string[];
  role: "Full Stack" | "Backend";
  link?: string;
  isPrivate?: boolean;
};

export const technologies: Technology[] = [
  {
    name: "Next.js",
    logo: "/logos/next-logo.png",
    description: "Production-grade React framework for high-performance, SEO-friendly web apps."
  },
  {
    name: "Node.js",
    logo: "/logos/nodejs.png",
    description: "Backend runtime for scalable APIs, services, and event-driven architectures."
  },
  {
    name: "TypeScript",
    logo: "/logos/typescript.png",
    description: "Strong typing for safer refactoring, cleaner contracts, and robust systems."
  },
  {
    name: "JavaScript",
    logo: "/logos/javascript.png",
    description: "Core language for modern web development across client and server execution."
  },
  {
    name: "PostgreSQL",
    logo: "/logos/postgresql.png",
    description: "Reliable relational database for transactional integrity and performance tuning."
  },
  {
    name: "MongoDB",
    logo: "/logos/mongodb.png",
    description: "Flexible document database for evolving schemas and high-velocity product needs."
  },
  {
    name: "Supabase",
    logo: "/logos/supabase.jpg",
    description: "Managed PostgreSQL platform with auth, storage, and real-time capabilities."
  },
  {
    name: "MQTT",
    logo: "/logos/mqtt.png",
    description: "Lightweight pub/sub protocol for real-time IoT messaging and device communication."
  },
  {
    name: "Redis",
    logo: "/logos/redis.png",
    description: "In-memory data store for caching, queues, and low-latency system performance."
  }
];

export const projects: Project[] = [
  {
    name: "cbrixi.com",
    description: "End-to-end platform delivery covering product UX, backend architecture, and deployment workflows.",
    stack: ["Next.js", "Node.js (TypeScript)", "PostgreSQL"],
    role: "Full Stack",
    link: "https://cbrixi.com"
  },
  {
    name: "gatewav.com",
    description: "Backend engineering for dependable API flows, domain modeling, and system reliability.",
    stack: ["Node.js (JavaScript)", "PostgreSQL"],
    role: "Backend",
    link: "https://gatewav.com"
  },
  {
    name: "genius.ng",
    description: "Scalable backend systems focused on typed services, data consistency, and maintainable APIs.",
    stack: ["Node.js (TypeScript)", "PostgreSQL"],
    role: "Backend",
    link: "https://genius.ng"
  },
  {
    name: "knowrist.com",
    description: "Backend platform development with emphasis on speed, uptime, and structured service boundaries.",
    stack: ["Node.js (TypeScript)", "PostgreSQL"],
    role: "Backend",
    link: "https://knowrist.com"
  },
  {
    name: "dashdiiorganic.ng",
    description: "Full stack implementation unifying modern frontend experiences with resilient backend services.",
    stack: ["Next.js", "Node.js (TypeScript)", "PostgreSQL"],
    role: "Full Stack",
    link: "https://dashdiiorganic.ng"
  },
  {
    name: "joscity.com",
    description: "Backend architecture for real-world product operations, reporting, and service orchestration.",
    stack: ["Node.js (JavaScript)", "PostgreSQL"],
    role: "Backend",
    link: "https://joscity.com"
  },
  {
    name: "P.H.I.M.S",
    description: "Private healthcare information management system with secure data handling workflows.",
    stack: ["Node.js (JavaScript)", "MongoDB"],
    role: "Backend",
    isPrivate: true
  }
];
