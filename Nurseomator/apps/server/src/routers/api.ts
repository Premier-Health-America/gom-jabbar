import Elysia, { t } from "elysia";
import { authRouter } from "./auth";
import { locationRouter } from "./location";
import { nurseRouter } from "./nurse";

export const api = new Elysia({ prefix: "/api/v1" })
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      set.headers["content-type"] = "application/json";
      return error.all.map((e) => {
        if (!e.summary) return;
        return e.schema.error;
      });
    }
  })
  .get("/health", () => "OK", {
    detail: {
      description: "Test connectivity to the REST API",
    },
    response: t.String(),
  })
  .use(authRouter)
  .use(locationRouter)
  .use(nurseRouter)
  .compile();
