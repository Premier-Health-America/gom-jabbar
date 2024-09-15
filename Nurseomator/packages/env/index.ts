import { Schema } from "zod";

export const createEnv = <T>(schema: Schema<T>): T => {
  const result = schema.safeParse(process.env);

  if (!result.success) {
    console.error("Invalid environment variables");
    for (const error of result.error.issues) {
      console.log(error.path, error.message);
    }
    process.exit(1);
  }

  return result.data;
};
