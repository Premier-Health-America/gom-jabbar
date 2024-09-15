import { createEnv } from "@repo/env";
import { z } from "zod";

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().min(1),
});

const env = createEnv(envSchema);

export const useEnv = () => {
  return env;
};
