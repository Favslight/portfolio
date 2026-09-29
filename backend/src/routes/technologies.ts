import type { FastifyInstance } from "fastify";
import { pool } from "../db.js";
import { requireAuth } from "../auth/middleware.js";
import { isUniqueViolation } from "../lib/db-errors.js";

type TechBody = {
  name: string;
  logo_url?: string;
  description: string;
  sort_order?: number;
};

export async function technologiesRoutes(app: FastifyInstance) {
  app.get("/api/technologies", async () => {
    const result = await pool.query("SELECT * FROM technologies ORDER BY sort_order ASC, created_at ASC");
    return result.rows;
  });

  app.post<{ Body: TechBody }>("/api/technologies", { preHandler: requireAuth }, async (request, reply) => {
    const { name, logo_url, description, sort_order } = request.body;
    if (!name || !description) {
      return reply.code(400).send({ error: "name and description are required" });
    }
    try {
      const result = await pool.query(
        `INSERT INTO technologies (name, logo_url, description, sort_order)
         VALUES ($1, $2, $3, COALESCE($4, 0))
         RETURNING *`,
        [name, logo_url ?? null, description, sort_order ?? null]
      );
      return reply.code(201).send(result.rows[0]);
    } catch (err) {
      if (isUniqueViolation(err)) {
        return reply.code(409).send({ error: `A technology named "${name}" already exists` });
      }
      throw err;
    }
  });

  app.put<{ Params: { id: string }; Body: Partial<TechBody> }>(
    "/api/technologies/:id",
    { preHandler: requireAuth },
    async (request, reply) => {
      const { id } = request.params;
      const b = request.body ?? {};
      try {
        const result = await pool.query(
          `UPDATE technologies SET
            name = COALESCE($1, name),
            logo_url = COALESCE($2, logo_url),
            description = COALESCE($3, description),
            sort_order = COALESCE($4, sort_order)
          WHERE id = $5
          RETURNING *`,
          [b.name, b.logo_url, b.description, b.sort_order, id]
        );
        if (!result.rows[0]) {
          return reply.code(404).send({ error: "Not found" });
        }
        return result.rows[0];
      } catch (err) {
        if (isUniqueViolation(err)) {
          return reply.code(409).send({ error: `A technology named "${b.name}" already exists` });
        }
        throw err;
      }
    }
  );

  app.delete<{ Params: { id: string } }>("/api/technologies/:id", { preHandler: requireAuth }, async (request, reply) => {
    await pool.query("DELETE FROM technologies WHERE id = $1", [request.params.id]);
    return reply.code(204).send();
  });
}
