import { swaggerUI } from "@hono/swagger-ui";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { JwtVariables } from "hono/jwt";
import { logger } from "hono/logger";
import { z } from "zod";
import { protectedMiddleware } from "./lib/auth";
import { AppError, InternalServerError, ValidationError } from "./lib/error";
import { locationsRouter } from "./routers";

const api = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json(new ValidationError(result.error), 400);
    }
  },
})
  .openapi(
    createRoute({
      method: "get",
      path: "/health",
      description: "Test connectivity to the REST API",
      responses: {
        200: {
          description: "OK",
          content: {
            "text/plain": {
              schema: z.string().openapi({ example: "OK" }),
            },
          },
        },
      },
    }),
    (c) => {
      return c.text("OK", 200);
    }
  )
  .route("/locations", locationsRouter);

const app = new OpenAPIHono<{ Variables: JwtVariables }>();
app.onError((err, c) => {
  if (err instanceof AppError) {
    console.log(`${err}`);
    return c.json(err, { status: err.status });
  }

  console.log("Error", err);
  const error = new InternalServerError(err.message, "Unknown error");
  console.log("Sent to client", error);
  return c.json(error, 500);
});

app.use(cors(), logger());
app.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer",
  {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  }
);
app
  .doc("/openapi.json", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Nurseomator API Reference",
    },
  })
  .get("/", apiReference({ spec: { url: "/openapi.json" } }))
  .get("/ui", swaggerUI({ url: "/openapi.json" }));
app.use("/api/v1/*", protectedMiddleware);
app.route("/api/v1", api);

export type API = typeof api;
export default app;
