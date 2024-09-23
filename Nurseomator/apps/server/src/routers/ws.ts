import { chatsTable, nurseLocationsTable } from "@repo/schemas/db";
import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { db } from "../db";
import { wsAuthenticatedPlugin } from "./auth";

export const wsConnections = new Map<
  string,
  // @ts-expect-error
  Parameters<Parameters<typeof ws.ws>["1"]["open"]>["0"]
>();

export const wsChatConnections = new Map<
  string,
  // @ts-expect-error
  Parameters<Parameters<typeof ws.ws>["1"]["open"]>["0"]
>();

const fetchNursesLocationAndStatus = async () => {
  return await db.query.nursesTable.findMany({
    columns: { id: true, name: true },
    with: {
      location: true,
      status: true,
    },
  });
};
export type NurseLocationAndStatus = Awaited<
  ReturnType<typeof fetchNursesLocationAndStatus>
>;

const ws = new Elysia({ prefix: "/ws" })
  .use(wsAuthenticatedPlugin)
  .state("intervals", {} as Record<string, ReturnType<typeof setInterval>>)
  .ws("/locations", {
    body: t.Object({
      latitude: t.Number(),
      longitude: t.Number(),
    }),
    response: t.Array(
      t.Object({
        id: t.String(),
        name: t.String(),
        status: t.Object({
          id: t.String(),
          nurseId: t.String(),
          status: t.Union([
            t.Literal("available"),
            t.Literal("busy"),
            t.Literal("emergency"),
            t.Literal("off"),
          ]),
          updatedAt: t.String(),
        }),
        location: t.Object({
          id: t.String(),
          nurseId: t.String(),
          latitude: t.Number(),
          longitude: t.Number(),
          updatedAt: t.String(),
        }),
      })
    ),
    open(ws) {
      console.log("WebSocket opened");
      const interval = setInterval(async () => {
        try {
          const locations = await fetchNursesLocationAndStatus();
          ws.send(locations);
        } catch (err) {
          console.error("Error sending location:", err);
        }
      }, 1000);
      ws.data.store.intervals[ws.id] = interval;
    },
    async message(ws, message) {
      console.log("Received message:", message);
      const { longitude, latitude } = message;
      await db
        .update(nurseLocationsTable)
        .set({
          longitude,
          latitude,
        })
        .where(eq(nurseLocationsTable.nurseId, ws.data.user.id));
    },
    close(ws, code, message) {
      console.log("WebSocket closed", code, message);
      clearInterval(ws.data.store.intervals[ws.id]);
    },
    ping(ws, data) {
      console.log("Ping received", data);
    },
    pong(ws, data) {
      console.log("Pong received", data);
    },
  })
  .ws("/notifications", {
    response: t.Object({
      id: t.String(),
      nurseId: t.String(),
      latitude: t.Number(),
      longitude: t.Number(),
      message: t.String(),
      createdAt: t.String(),
      updatedAt: t.String(),
    }),
    open(ws) {
      console.log("WebSocket opened");
      // @ts-expect-error types of response is not infered
      wsConnections.set(ws.id, ws);
    },
    close(ws, code, message) {
      console.log("WebSocket closed", code, message);
      clearInterval(ws.data.store.intervals[ws.id]);
      wsConnections.delete(ws.id);
    },
  })
  .ws("/chats", {
    body: t.Object({
      message: t.String(),
      nurseId: t.String(),
      patientId: t.String(),
    }),
    response: t.Object({
      id: t.String(),
      nurseId: t.String(),
      patientId: t.String(),
      sender: t.Union([t.Literal("nurse"), t.Literal("patient")]),
      message: t.String(),
      createdAt: t.String(),
      updatedAt: t.String(),
    }),
    open(ws) {
      console.log("WebSocket opened");
      // @ts-expect-error types of response is not infered
      wsChatConnections.set(ws.data.user.id, ws);
    },
    async message(ws, message) {
      console.log("Received chat message:", message);
      const chat = await db
        .insert(chatsTable)
        .values({
          message: message.message,
          nurseId: message.nurseId,
          patientId: message.patientId,
          sender: ws.data.user.id === message.nurseId ? "nurse" : "patient",
        })
        .returning()
        .execute()
        .then((res) => res[0]);

      const peerId =
        ws.data.user.id === chat.nurseId ? chat.patientId : chat.nurseId;
      wsChatConnections.get(peerId)?.send(chat);
    },
    close(ws, code, message) {
      console.log("WebSocket closed", code, message);
      wsChatConnections.delete(ws.data.user.id);
    },
  });

export { ws as wsRouter };
