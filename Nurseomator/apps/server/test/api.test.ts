import { faker } from "@faker-js/faker";
import { Nurse, patientRecordsTable, patientsTable } from "@repo/schemas/db";
import { beforeAll, describe, expect, it } from "bun:test";
import { eq, getTableColumns } from "drizzle-orm";
import { db } from "../src/db";
import { lucia } from "../src/lib/auth";
import { apiClient } from "./apiClient";

describe("Auth", () => {
  const user = {
    email: faker.internet.email(),
    password: "password",
    name: faker.person.fullName(),
  };

  it("returns 401 Unauthorized when no token is provided", async () => {
    const { status } = await apiClient.facilities.get();
    expect(status).toBe(401);
  });

  it("signs up a nurse", async () => {
    const { status, error, data } = await apiClient.auth.signup.post(user);

    expect(status).toBe(200);
    expect(error).toBe(null);
    expect(data?.token).toBeDefined();
  });

  it("signs in a nurse", async () => {
    const { status, error, data } = await apiClient.auth.signin.post({
      ...user,
    });

    expect(status).toBe(200);
    expect(error).toBe(null);
    expect(data?.token).toBeDefined();
  });
});

describe("API", async () => {
  let selectedNurse: Nurse;
  let token: string;

  beforeAll(async () => {
    const nurse = await db.query.nursesTable.findFirst();
    if (!nurse) {
      throw new Error(
        "No nurses found in the database. Please seed the database first with `bun run db:seed`"
      );
    }
    selectedNurse = nurse;
    const { id } = await lucia.createSession(selectedNurse.id, {});
    token = id;
  });

  it("returns urgent ureas", async () => {
    const { status, error, data } = await apiClient["urgent-areas"].get({
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(status).toBe(200);
    expect(error).toBe(null);
    expect(data).toBeDefined();
    expect(data?.length).toBeGreaterThan(0);
  });

  it("returns facilities", async () => {
    const { status, error, data } = await apiClient.facilities.get({
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(status).toBe(200);
    expect(error).toBe(null);
    expect(data).toBeDefined();
    expect(data?.length).toBeGreaterThan(0);
  });

  it("creates an emergency alert", async () => {
    const { status, error, data } = await apiClient["emergency-alerts"].post(
      {
        latitude: 65.32,
        longitude: -105.32,
        message: "This is an emergency alert",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    expect(status).toBe(200);
    expect(error).toBe(null);
    expect(data).toEqual({
      message: "Alert created",
    });
  });
});

describe("Nurses", async () => {
  let selectedNurse: Nurse;
  let token: string;

  beforeAll(async () => {
    const nurse = await db.query.nursesTable.findFirst();
    if (!nurse) {
      throw new Error(
        "No nurses found in the database. Please seed the database first with `bun run db:seed`"
      );
    }
    selectedNurse = nurse;
    const { id } = await lucia.createSession(selectedNurse.id, {});
    token = id;
  });

  it("returns 401 Unauthorized when no token is provided", async () => {
    const { status } = await apiClient.nurse.index.get();
    expect(status).toBe(401);
  });

  it("gets nurse profile", async () => {
    const { status, error, data } = await apiClient.nurse.index.get({
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(status).toBe(200);
    expect(error).toBe(null);
    expect(data).toBeDefined();
    expect(data?.id).toBe(selectedNurse.id);
  });

  it("updates nurse status", async () => {
    const status = "available";
    const latitude = 65.32;
    const longitude = -105.32;
    const { status: statusCode, data } = await apiClient.nurse.status.post(
      { status, latitude, longitude },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    expect(statusCode).toBe(200);
    expect(data).toEqual({
      success: true,
      message: "Status updated successfully",
    });
  });

  it("returns error when updating nurse status with invalid status", async () => {
    const status = "invalid-status";
    const latitude = 65.32;
    const longitude = -105.32;
    const { status: statusCode, error } = await apiClient.nurse.status.post(
      // @ts-expect-error
      { status, latitude, longitude },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    expect(statusCode).toBe(422);
    expect(error).toBeDefined();
  });
});

describe("Patients", async () => {
  let selectedNurse: Nurse;
  let token: string;

  beforeAll(async () => {
    const nurse = await db.query.nursesTable.findFirst();
    if (!nurse) {
      throw new Error(
        "No nurses found in the database. Please seed the database first with `bun run db:seed`"
      );
    }
    selectedNurse = nurse;
    const { id } = await lucia.createSession(selectedNurse.id, {});
    token = id;
  });

  it("returns 401 Unauthorized when no token is provided", async () => {
    const { status } = await apiClient.patients.get();
    expect(status).toBe(401);
  });

  it("gets patients", async () => {
    const { status, error, data } = await apiClient.patients.get({
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(status).toBe(200);
    expect(error).toBe(null);
    expect(data).toBeDefined();
    expect(data?.length).toBeGreaterThan(0);
  });

  it("returns 404 when patient does not exist", async () => {
    const { status, error } = await apiClient
      .patients({ id: "invalid-id" })
      .records.get({
        headers: { Authorization: `Bearer ${token}` },
        query: { cursor: "", pageSize: 10 },
      });
    expect(status).toBe(404);
    expect(error).toBeDefined();
    expect(error?.value).toBe("Patient not found");
  });

  it("returns patient records", async () => {
    const patientId = await db
      .selectDistinct(getTableColumns(patientsTable))
      .from(patientsTable)
      .innerJoin(
        patientRecordsTable,
        eq(patientsTable.id, patientRecordsTable.patientId)
      )
      .where(eq(patientRecordsTable.nurseId, selectedNurse.id))
      .execute()
      .then((patients) => patients[0].id);

    const { status, error, data } = await apiClient
      .patients({ id: patientId })
      .records.get({
        headers: { Authorization: `Bearer ${token}` },
        query: { cursor: "", pageSize: 10 },
      });
    expect(status).toBe(200);
    expect(error).toBe(null);
    expect(data).toBeDefined();
    expect(data?.data.length).toBeGreaterThan(0);
  });

  it("returns chat messages", async () => {
    const patientId = await db
      .selectDistinct(getTableColumns(patientsTable))
      .from(patientsTable)
      .innerJoin(
        patientRecordsTable,
        eq(patientsTable.id, patientRecordsTable.patientId)
      )
      .where(eq(patientRecordsTable.nurseId, selectedNurse.id))
      .execute()
      .then((patients) => patients[0].id);

    const { status, error, data } = await apiClient
      .patients({ id: patientId })
      .chat.get({
        headers: { Authorization: `Bearer ${token}` },
        query: { cursor: "", pageSize: 10 },
      });
    expect(status).toBe(200);
    expect(error).toBe(null);
    expect(data).toBeDefined();
    expect(data?.data.length).toBeGreaterThan(0);
  });
});

describe("Supplies", async () => {
  let selectedNurse: Nurse;
  let token: string;

  beforeAll(async () => {
    const nurse = await db.query.nursesTable.findFirst();
    if (!nurse) {
      throw new Error(
        "No nurses found in the database. Please seed the database first with `bun run db:seed`"
      );
    }
    selectedNurse = nurse;
    const { id } = await lucia.createSession(selectedNurse.id, {});
    token = id;
  });

  it("returns supplies", async () => {
    const { status, error, data } = await apiClient.supplies.get({
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(status).toBe(200);
    expect(error).toBe(null);
    expect(data).toBeDefined();
    expect(data?.length).toBeGreaterThan(0);
  });

  it("returns 401 Unauthorized when no token is provided", async () => {
    const { status } = await apiClient.supplies.get();
    expect(status).toBe(401);
  });

  it("returns 404 when supply does not exist", async () => {
    const { status, error } = await apiClient
      .supplies({ id: "invalid-id" })
      .request.post(
        {
          quantity: 10,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

    expect(status).toBe(404);
    expect(error).toBeDefined();
    expect(error?.value).toBe("Supply doesn't exist");
  });

  const supplyId = await db.query.suppliesTable
    .findFirst()
    .then((supply) => supply?.id as string);

  it("creates a supply request", async () => {
    const { status, error, data } = await apiClient
      .supplies({ id: supplyId })
      .request.post(
        {
          quantity: 10,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    expect(status).toBe(200);
    expect(error).toBe(null);
    expect(data).toEqual({
      message: "Supply request created",
    });
  });
});
