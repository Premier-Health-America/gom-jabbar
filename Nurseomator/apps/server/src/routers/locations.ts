import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { UnauthorizedError } from "../lib/error";

const router = new OpenAPIHono().openapi(
  createRoute({
    method: "get",
    path: "/",
    security: [
      {
        AuthorizationBearer: [],
      },
    ],
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z
              .object({
                locations: z
                  .array(z.string())
                  .openapi({ example: ["location1", "location2"] }),
              })
              .openapi("User"),
          },
        },
        description: "Retrieve the user",
      },
      401: UnauthorizedError.openApi,
    },
  }),
  (c) => {
    return c.json(
      {
        locations: ["location1", "location2"],
      },
      200
    );
  }
);

export default router;
