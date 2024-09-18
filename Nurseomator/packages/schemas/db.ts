import { createId } from "@paralleldrive/cuid2";
import { Static } from "@sinclair/typebox";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-typebox";

export const nursesTable = pgTable("nurses", {
  id: text("id").primaryKey().$default(createId),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
});

export const NurseSchema = createSelectSchema(nursesTable);
export type Nurse = Static<typeof NurseSchema>;

export const locationsTable = pgTable("locations", {
  id: text("id").primaryKey().$default(createId),
  nurseId: text("nurse_id").references(() => nursesTable.id),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const LocationSchema = createSelectSchema(locationsTable);
export type Location = Static<typeof LocationSchema>;

export const suppliesTable = pgTable("supplies", {
  id: text("id").primaryKey().$default(createId),
  name: text("name").notNull(),
  quantity: integer("quantity").notNull(),
  threshold: integer("threshold").notNull(),
});

export const SupplySchema = createSelectSchema(suppliesTable);
export type Supply = Static<typeof SupplySchema>;

export const patientsTable = pgTable("patients", {
  id: text("id").primaryKey().$default(createId),
  name: text("name").notNull(),
  medicalRecord: text("medical_record").notNull(),
});

export const PatientSchema = createSelectSchema(patientsTable);
export type Patient = Static<typeof PatientSchema>;
