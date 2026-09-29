import type { FastifyInstance } from "fastify";
import { pool } from "../db.js";
import { requireAuth } from "../auth/middleware.js";

type ContactBody = {
  name: string;
  contact_info: string;
  message: string;
};

export async function contactRoutes(app: FastifyInstance) {
  app.post<{ Body: ContactBody }>("/api/contact", async (request, reply) => {
    const { name, contact_info, message } = request.body ?? {};
    if (!name || !contact_info || !message) {
      return reply.code(400).send({ error: "name, contact_info and message are required" });
    }
    const result = await pool.query(
      `INSERT INTO contact_messages (name, contact_info, message)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, contact_info, message]
    );
    return reply.code(201).send(result.rows[0]);
  });

  app.get("/api/contact", { preHandler: requireAuth }, async () => {
    const result = await pool.query("SELECT * FROM contact_messages ORDER BY created_at DESC");
    return result.rows;
  });

  app.put<{ Params: { id: string } }>("/api/contact/:id/read", { preHandler: requireAuth }, async (request) => {
    const result = await pool.query(
      "UPDATE contact_messages SET read = true WHERE id = $1 RETURNING *",
      [request.params.id]
    );
    return result.rows[0];
  });

  app.delete<{ Params: { id: string } }>("/api/contact/:id", { preHandler: requireAuth }, async (request, reply) => {
    await pool.query("DELETE FROM contact_messages WHERE id = $1", [request.params.id]);
    return reply.code(204).send();
  });
}
