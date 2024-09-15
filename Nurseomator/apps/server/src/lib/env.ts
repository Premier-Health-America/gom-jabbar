import { createEnv } from "@repo/env";
import { z } from "zod";

const envSchema = z.object({});

export const env = createEnv(envSchema);
