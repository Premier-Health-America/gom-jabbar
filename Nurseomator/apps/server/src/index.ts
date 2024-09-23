import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { api } from "./routers/api";

const app = new Elysia()
  .use(
    swagger({
      path: "/",
      documentation: {
        openapi: "3.0.0",
        info: {
          version: "1.0.0",
          title: "Nurseomator API Reference",
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
      },
    })
  )
  .use(api)
  .compile();

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type API = typeof app;
