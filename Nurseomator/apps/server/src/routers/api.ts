import Elysia, { t } from "elysia";
import { authRouter } from "./auth";
import { locationRouter } from "./location";
import { nurseRouter } from "./nurse";

export const api = new Elysia({ prefix: "/api/v1" })
  .onError(({ code, error, set }) => {
    if (error instanceof Object) {
      set.headers["content-type"] = "application/json";
    }
    if (code === "VALIDATION") {
      console.log("VALIDATION ERROR:", error.all);
    }
  })
  .onTransform(function log({ path, request: { method } }) {
    console.log(`${method} ${path}`);
  })
  .get("/health", () => "OK", {
    detail: {
      description: "Test connectivity to the REST API",
    },
    response: t.String({ examples: ["OK"] }),
  })
  .use(authRouter)
  .use(locationRouter)
  .use(nurseRouter)
  .compile();
