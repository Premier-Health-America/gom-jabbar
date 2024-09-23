import { supplyRequestsTable } from "@repo/schemas/db";
import Elysia, { t } from "elysia";
import { db } from "../db";
import { authenticatedPlugin } from "./auth";

const router = new Elysia({ prefix: "/supplies" })
  .use(authenticatedPlugin)
  .model({
    supplies: t.Array(
      t.Object({
        id: t.String(),
        name: t.String(),
        quantity: t.Number(),
        measurementUnit: t.String(),
        createdAt: t.String(),
        updatedAt: t.String(),
      }),
      { description: "Supplies available in the system" }
    ),
    supplyRequestResponse: t.Object({
      message: t.Literal("Supply request created", {
        description: "Message indicating that the supply request was created",
        examples: ["Supply request created"],
      }),
    }),
  })
  .get("", async ({ error }) => {
    try {
      const supplies = await db.query.suppliesTable.findMany();
      return supplies;
    } catch (err) {
      console.log("CATCHED ERROR WHEN FETCHING SUPPLIES:\n", err);
      return error(500, "Something went wrong");
    }
  })
  .post(
    "/:id/request",
    async ({ params, body, user, error }) => {
      try {
        await db.insert(supplyRequestsTable).values({
          nurseId: user.id,
          supplyId: params.id,
          quantity: body.quantity,
        });

        return { message: "Supply request created" };
      } catch (err) {
        console.log("CATCHED ERROR WHEN CREATING SUPPLY REQUEST:\n", err);
        return error(500, "Something went wrong");
      }
    },
    {
      body: t.Object({
        quantity: t.Number(),
      }),
      response: {
        200: "supplyRequestResponse",
        500: "InternalServerError",
      },
    }
  );

export { router as supplyRouter };
