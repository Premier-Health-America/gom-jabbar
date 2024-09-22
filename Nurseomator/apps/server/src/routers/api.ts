import { emergencyAlertsTable } from "@repo/schemas/db";
import Elysia, { t } from "elysia";
import { db } from "../db";
import { authenticatedPlugin, authRouter } from "./auth";
import { nurseRouter } from "./nurse";
import { wsConnections, wsRouter } from "./ws";

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
  .use(wsRouter)
  .use(nurseRouter)
  .use(authenticatedPlugin)
  .get("/urgent-areas", async ({ error }) => {
    try {
      const areas = await db.query.urgentAreasTable.findMany();
      return areas;
    } catch (err) {
      console.log("CATCHED ERROR WHEN FETCHING URGENT AREAS:\n", err);
      return error(500, "Something went wrong");
    }
  })
  .get("/facilities", async ({ error }) => {
    try {
      const facilities = await db.query.healthcareFacilitiesTable.findMany();
      return facilities;
    } catch (err) {
      console.log("CATCHED ERROR WHEN FETCHING FACILITIES:\n", err);
      return error(500, "Something went wrong");
    }
  })
  .post(
    "/emergency-alerts",
    async ({ body, error, user }) => {
      const { latitude, longitude, message } = body;
      try {
        const alert = await db
          .insert(emergencyAlertsTable)
          .values({
            nurseId: user.id,
            latitude,
            longitude,
            message,
          })
          .returning()
          .execute()
          .then((alert) => alert[0]);
        wsConnections.forEach((ws) => {
          ws.send(alert);
        });

        return { message: "Alert created" };
      } catch (err) {
        console.log("CATCHED ERROR WHEN CREATING EMERGENCY ALERT:\n", err);
        return error(500, "Something went wrong");
      }
    },
    {
      body: t.Object({
        message: t.String(),
        latitude: t.Number(),
        longitude: t.Number(),
      }),
    }
  )
  .compile();
