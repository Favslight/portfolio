import type { FastifyInstance } from "fastify";
import { pool } from "../db.js";
import { requireAuth } from "../auth/middleware.js";

type ProfileBody = {
  name?: string;
  title?: string;
  tagline?: string;
  bio?: string;
  years_experience?: number;
  profile_image_url?: string;
  secondary_image_url?: string;
  linkedin_url?: string;
  email?: string;
};

export async function profileRoutes(app: FastifyInstance) {
  app.get("/api/profile", async () => {
    const result = await pool.query("SELECT * FROM profile WHERE id = 1");
    return result.rows[0] ?? null;
  });

  app.put<{ Body: ProfileBody }>("/api/profile", { preHandler: requireAuth }, async (request) => {
    const b = request.body ?? {};
    const result = await pool.query(
      `UPDATE profile SET
        name = COALESCE($1, name),
        title = COALESCE($2, title),
        tagline = COALESCE($3, tagline),
        bio = COALESCE($4, bio),
        years_experience = COALESCE($5, years_experience),
        profile_image_url = COALESCE($6, profile_image_url),
        secondary_image_url = COALESCE($7, secondary_image_url),
        linkedin_url = COALESCE($8, linkedin_url),
        email = COALESCE($9, email),
        updated_at = now()
      WHERE id = 1
      RETURNING *`,
      [
        b.name,
        b.title,
        b.tagline,
        b.bio,
        b.years_experience,
        b.profile_image_url,
        b.secondary_image_url,
        b.linkedin_url,
        b.email
      ]
    );
    return result.rows[0];
  });
}
