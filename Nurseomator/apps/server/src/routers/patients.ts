import { patientRecordsTable, patientsTable } from "@repo/schemas/db";
import { and, eq, getTableColumns } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { db } from "../db";
import { authenticatedPlugin } from "./auth";

const router = new Elysia({ prefix: "/patients" })
  .use(authenticatedPlugin)
  .model({
    patients: t.Array(
      t.Object({
        id: t.String(),
        name: t.String(),
        age: t.Number(),
        sex: t.String(),
        height: t.Number(),
        weight: t.Number(),
        email: t.String(),
        createdAt: t.String(),
        updatedAt: t.String(),
      })
    ),
    records: t.Array(
      t.Object({
        id: t.String(),
        nurseId: t.String(),
        patientId: t.String(),
        recordDescription: t.String(),
        createdAt: t.String(),
        updatedAt: t.String(),
      })
    ),
  })
  .get(
    "",
    async ({ user, error }) => {
      try {
        const patients = await db
          .selectDistinct(getTableColumns(patientsTable))
          .from(patientsTable)
          .innerJoin(
            patientRecordsTable,
            eq(patientsTable.id, patientRecordsTable.patientId)
          )
          .where(eq(patientRecordsTable.nurseId, user.id))
          .execute();

        return patients;
      } catch (err) {
        console.log("CATCHED ERROR WHEN FETCHING PATIENTS:\n", err);
        return error(500, "Something went wrong");
      }
    },
    {
      response: {
        200: "patients",
        500: "InternalServerError",
      },
    }
  )
  .get(
    "/patients/:id/records",
    async ({ params, user, error }) => {
      try {
        const records = await db
          .select()
          .from(patientRecordsTable)
          .where(
            and(
              eq(patientsTable.id, params.id),
              eq(patientRecordsTable.nurseId, user.id)
            )
          )
          .execute();

        return records;
      } catch (err) {
        console.log("CATCHED ERROR WHEN FETCHING PATIENT:\n", err);
        return error(500, "Something went wrong");
      }
    },
    {
      response: {
        200: "records",
        500: "InternalServerError",
      },
    }
  );

export { router as patientsRouter };
