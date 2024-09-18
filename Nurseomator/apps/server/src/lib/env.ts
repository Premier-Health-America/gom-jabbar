import { createEnv } from "@repo/env";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  ENVIRONMENT: z.enum(["development", "production"]),
});

export const env = createEnv(envSchema);
