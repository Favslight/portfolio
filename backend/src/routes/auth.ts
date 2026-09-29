import type { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import { pool } from "../db.js";

type LoginBody = {
  email: string;
  password: string;
};

export async function authRoutes(app: FastifyInstance) {
  app.post<{ Body: LoginBody }>("/api/auth/login", async (request, reply) => {
    const { email, password } = request.body ?? {};

    if (!email || !password) {
      return reply.code(400).send({ error: "Email and password are required" });
    }

    const result = await pool.query("SELECT id, email, password_hash FROM admins WHERE email = $1", [
      email.toLowerCase().trim()
    ]);

    const admin = result.rows[0];
    if (!admin) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const token = app.jwt.sign({ sub: admin.id, email: admin.email }, { expiresIn: "7d" });
    return { token };
  });
}
