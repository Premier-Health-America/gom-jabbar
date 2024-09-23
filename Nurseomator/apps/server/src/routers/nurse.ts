import {
  nurseLocationsTable,
  nurseStatuses,
  nurseStatusTable,
} from "@repo/schemas/db";
import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { db } from "../db";
import { authenticatedPlugin } from "./auth";

const router = new Elysia({ prefix: "/nurse" })
  .use(authenticatedPlugin)
  .get("/", async ({ user }) => {
    return user;
  })
  .post(
    "/status",
    async ({ user, body, error }) => {
      const { status, latitude, longitude } = body;
      try {
        await db.transaction(async (tx) => {
          await tx
            .update(nurseLocationsTable)
            .set({ latitude, longitude })
            .where(eq(nurseLocationsTable.nurseId, user.id));
          await tx
            .update(nurseStatusTable)
            .set({ status })
            .where(eq(nurseStatusTable.nurseId, user.id));
        });
        return { success: true, message: "Status updated successfully" };
      } catch (err) {
        console.log("CATCHED UPDATE STATUS ERROR:\n", err);
        return error(500, "Something went wrong");
      }
    },
    {
      body: t.Object({
        latitude: t.Number({ examples: [65.32] }),
        longitude: t.Number({ examples: [-105.32] }),
        status: t.Union(
          [
            t.Literal("available"),
            t.Literal("busy"),
            t.Literal("emergency"),
            t.Literal("off"),
          ],
          {
            examples: [nurseStatuses[0], nurseStatuses[1]],
          }
        ),
      }),
      response: {
        200: t.Object({
          success: t.Boolean(),
          message: t.String({ examples: ["Status updated successfully"] }),
        }),
        500: "InternalServerError",
      },
    }
  );

export { router as nurseRouter };
