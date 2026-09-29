import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import { authRoutes } from "./routes/auth.js";
import { profileRoutes } from "./routes/profile.js";
import { technologiesRoutes } from "./routes/technologies.js";
import { projectsRoutes } from "./routes/projects.js";
import { ongoingProjectsRoutes } from "./routes/ongoing-projects.js";
import { contactRoutes } from "./routes/contact.js";
import { uploadsRoutes } from "./routes/uploads.js";

const app = Fastify({ logger: true });

const configuredOrigins = (process.env.FRONTEND_ORIGIN ?? "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const localDevOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\]|(\d{1,3}\.){3}\d{1,3}):\d+$/;

await app.register(cors, {
  origin(origin, callback) {
    if (!origin || configuredOrigins.includes(origin) || localDevOriginPattern.test(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("Not allowed by CORS"), false);
  }
});

await app.register(jwt, {
  secret: process.env.JWT_SECRET ?? "dev-secret-change-me"
});

await app.register(multipart, {
  limits: { fileSize: 10 * 1024 * 1024 }
});

app.get("/api/health", async () => ({ status: "ok" }));

await app.register(authRoutes);
await app.register(profileRoutes);
await app.register(technologiesRoutes);
await app.register(projectsRoutes);
await app.register(ongoingProjectsRoutes);
await app.register(contactRoutes);
await app.register(uploadsRoutes);

const port = Number(process.env.PORT ?? 4000);

app
  .listen({ port, host: "0.0.0.0" })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
