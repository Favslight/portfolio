import type { FastifyInstance } from "fastify";
import { pool } from "../db.js";
import { requireAuth } from "../auth/middleware.js";
import { isUniqueViolation } from "../lib/db-errors.js";

type ProjectBody = {
  name: string;
  description: string;
  stack: string[];
  role: "Full Stack" | "Backend";
  link?: string;
  image_url?: string;
  backend_percent?: number;
  frontend_percent?: number;
  is_private?: boolean;
  sort_order?: number;
};

export async function projectsRoutes(app: FastifyInstance) {
  app.get("/api/projects", async () => {
    const result = await pool.query("SELECT * FROM projects ORDER BY sort_order ASC, created_at ASC");
    return result.rows;
  });

  app.post<{ Body: ProjectBody }>("/api/projects", { preHandler: requireAuth }, async (request, reply) => {
    const b = request.body;
    if (!b?.name || !b?.description || !b?.role) {
      return reply.code(400).send({ error: "name, description and role are required" });
    }
    const backendPercent = b.backend_percent ?? 100;
    const frontendPercent = b.frontend_percent ?? 100 - backendPercent;

    try {
      const result = await pool.query(
        `INSERT INTO projects
          (name, description, stack, role, link, image_url, backend_percent, frontend_percent, is_private, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, COALESCE($9, false), COALESCE($10, 0))
         RETURNING *`,
        [
          b.name,
          b.description,
          b.stack ?? [],
          b.role,
          b.link ?? null,
          b.image_url ?? null,
          backendPercent,
          frontendPercent,
          b.is_private ?? false,
          b.sort_order ?? null
        ]
      );
      return reply.code(201).send(result.rows[0]);
    } catch (err) {
      if (isUniqueViolation(err)) {
        return reply.code(409).send({ error: `A project named "${b.name}" already exists` });
      }
      throw err;
    }
  });

  app.put<{ Params: { id: string }; Body: Partial<ProjectBody> }>(
    "/api/projects/:id",
    { preHandler: requireAuth },
    async (request, reply) => {
      const { id } = request.params;
      const b = request.body ?? {};
      try {
        const result = await pool.query(
          `UPDATE projects SET
            name = COALESCE($1, name),
            description = COALESCE($2, description),
            stack = COALESCE($3, stack),
            role = COALESCE($4, role),
            link = COALESCE($5, link),
            image_url = COALESCE($6, image_url),
            backend_percent = COALESCE($7, backend_percent),
            frontend_percent = COALESCE($8, frontend_percent),
            is_private = COALESCE($9, is_private),
            sort_order = COALESCE($10, sort_order)
          WHERE id = $11
          RETURNING *`,
          [
            b.name,
            b.description,
            b.stack,
            b.role,
            b.link,
            b.image_url,
            b.backend_percent,
            b.frontend_percent,
            b.is_private,
            b.sort_order,
            id
          ]
        );
        if (!result.rows[0]) {
          return reply.code(404).send({ error: "Not found" });
        }
        return result.rows[0];
      } catch (err) {
        if (isUniqueViolation(err)) {
          return reply.code(409).send({ error: `A project named "${b.name}" already exists` });
        }
        throw err;
      }
    }
  );

  app.delete<{ Params: { id: string } }>("/api/projects/:id", { preHandler: requireAuth }, async (request, reply) => {
    await pool.query("DELETE FROM projects WHERE id = $1", [request.params.id]);
    return reply.code(204).send();
  });
}
