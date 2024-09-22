import * as schema from "@repo/schemas/db";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../lib/env";

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, {
  schema,
  // logger: env.ENVIRONMENT === "development",
});
