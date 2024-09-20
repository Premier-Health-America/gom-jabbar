import Elysia, { t } from "elysia";

export const AppErrorModels = new Elysia({ name: "app-error-models" }).model({
  UnauthorizedError: t.Literal("Unauthorized", { examples: ["Unauthorized"] }),
  NotFoundError: t.Union([
    t.Literal("Not found", { examples: ["Not found"] }),
    t.String(),
  ]),
  ForbiddenError: t.Literal("Forbidden", { examples: ["Forbidden"] }),
  BadRequestError: t.Union([t.Literal("Bad request"), t.String()]),
  InternalServerError: t.Union(
    [t.Literal("Internal server error"), t.Literal("Something went wrong")],
    { examples: ["Internal server error", "Something went wrong"] }
  ),
});
