import type { Config } from "drizzle-kit";
import { env } from "./src/lib/env";

export default {
  schema: "../../packages/schemas/db/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
