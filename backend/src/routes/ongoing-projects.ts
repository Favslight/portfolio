import type { FastifyInstance } from "fastify";
import { pool } from "../db.js";
import { requireAuth } from "../auth/middleware.js";

type OngoingProjectBody = {
  name: string;
  description: string;
  stack?: string[];
  status?: string;
};

export async function ongoingProjectsRoutes(app: FastifyInstance) {
  app.get("/api/ongoing-projects", async () => {
    const result = await pool.query("SELECT * FROM ongoing_projects ORDER BY created_at DESC");
    return result.rows;
  });

  app.post<{ Body: OngoingProjectBody }>("/api/ongoing-projects", { preHandler: requireAuth }, async (request, reply) => {
    const { name, description, stack, status } = request.body ?? {};
    if (!name || !description) {
      return reply.code(400).send({ error: "name and description are required" });
    }
    const result = await pool.query(
      `INSERT INTO ongoing_projects (name, description, stack, status)
       VALUES ($1, $2, $3, COALESCE($4, 'In Progress'))
       RETURNING *`,
      [name, description, stack ?? [], status ?? null]
    );
    return reply.code(201).send(result.rows[0]);
  });

  app.put<{ Params: { id: string }; Body: Partial<OngoingProjectBody> }>(
    "/api/ongoing-projects/:id",
    { preHandler: requireAuth },
    async (request, reply) => {
      const { id } = request.params;
      const b = request.body ?? {};
      const result = await pool.query(
        `UPDATE ongoing_projects SET
          name = COALESCE($1, name),
          description = COALESCE($2, description),
          stack = COALESCE($3, stack),
          status = COALESCE($4, status)
        WHERE id = $5
        RETURNING *`,
        [b.name, b.description, b.stack, b.status, id]
      );
      if (!result.rows[0]) {
        return reply.code(404).send({ error: "Not found" });
      }
      return result.rows[0];
    }
  );

  app.delete<{ Params: { id: string } }>(
    "/api/ongoing-projects/:id",
    { preHandler: requireAuth },
    async (request, reply) => {
      await pool.query("DELETE FROM ongoing_projects WHERE id = $1", [request.params.id]);
      return reply.code(204).send();
    }
  );
}
