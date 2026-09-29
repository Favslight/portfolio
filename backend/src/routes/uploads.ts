import type { FastifyInstance } from "fastify";
import { requireAuth } from "../auth/middleware.js";
import { isCloudinaryConfigured, uploadBufferToCloudinary } from "../lib/cloudinary.js";

export async function uploadsRoutes(app: FastifyInstance) {
  app.post("/api/uploads", { preHandler: requireAuth }, async (request, reply) => {
    if (!isCloudinaryConfigured()) {
      return reply.code(500).send({ error: "Cloudinary is not configured yet" });
    }

    const file = await request.file();
    if (!file) {
      return reply.code(400).send({ error: "No file uploaded" });
    }

    const buffer = await file.toBuffer();
    const secureUrl = await uploadBufferToCloudinary(buffer, "portfolio");
    return { url: secureUrl };
  });
}
