import {
  chatsTable,
  patientRecordsTable,
  patientsTable,
} from "@repo/schemas/db";
import { and, desc, eq, getTableColumns, lt } from "drizzle-orm";
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
    records: t.Object({
      hasMore: t.Boolean(),
      cursor: t.Optional(t.String()),
      data: t.Array(
        t.Object({
          id: t.String(),
          nurseId: t.String(),
          patientId: t.String(),
          recordDescription: t.String(),
          createdAt: t.String(),
          updatedAt: t.String(),
        })
      ),
    }),
    chats: t.Object({
      hasMore: t.Boolean(),
      cursor: t.Optional(t.String()),
      data: t.Array(
        t.Object({
          id: t.String(),
          nurseId: t.String(),
          patientId: t.String(),
          sender: t.Union([t.Literal("nurse"), t.Literal("patient")]),
          message: t.String(),
          createdAt: t.String(),
          updatedAt: t.String(),
        })
      ),
    }),
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
    "/:id/records",
    async ({ params, user, error, query: { cursor, pageSize } }) => {
      console.log("CURSOR:", cursor, "PAGESIZE:", pageSize);
      try {
        const records = await db
          .select(getTableColumns(patientRecordsTable))
          .from(patientRecordsTable)
          .innerJoin(
            patientsTable,
            eq(patientsTable.id, patientRecordsTable.patientId)
          )
          .where(
            and(
              eq(patientsTable.id, params.id),
              eq(patientRecordsTable.nurseId, user.id),
              cursor ? lt(patientRecordsTable.createdAt, cursor) : undefined
            )
          )
          .limit(pageSize)
          .orderBy(desc(patientRecordsTable.createdAt))
          .execute();

        return {
          data: records,
          hasMore: records.length === pageSize,
          cursor: records.at(-1)?.createdAt,
        };
      } catch (err) {
        console.log("CATCHED ERROR WHEN FETCHING PATIENT:\n", err);
        return error(500, "Something went wrong");
      }
    },
    {
      query: t.Object({
        pageSize: t.Number(),
        cursor: t.String(),
      }),
      response: {
        200: "records",
        500: "InternalServerError",
      },
    }
  )
  .get(
    "/chat",
    async ({ query: { cursor, pageSize }, user, error }) => {
      try {
        const chats = await db
          .select()
          .from(chatsTable)
          .where(
            and(
              eq(chatsTable.nurseId, user.id),
              cursor ? lt(chatsTable.createdAt, cursor) : undefined
            )
          )
          .limit(pageSize)
          .orderBy(desc(chatsTable.createdAt))
          .execute();

        return {
          data: chats,
          hasMore: chats.length === pageSize,
          cursor: chats.at(-1)?.createdAt,
        };
      } catch (err) {
        console.log("CATCHED ERROR WHEN FETCHING PATIENT:\n", err);
        return error(500, "Something went wrong");
      }
    },
    {
      query: t.Object({
        pageSize: t.Number(),
        cursor: t.String(),
      }),
      response: {
        200: "chats",
        500: "InternalServerError",
      },
    }
  );

export { router as patientsRouter };
