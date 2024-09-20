import Elysia from "elysia";
import { authenticatedPlugin } from "./auth";

const router = new Elysia({ prefix: "/nurse" })
  .use(authenticatedPlugin)
  .get("/", async ({ user }) => {
    return user;
  });

export { router as nurseRouter };
