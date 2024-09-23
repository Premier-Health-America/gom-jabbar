import { createId } from "@paralleldrive/cuid2";
import { Static, Type } from "@sinclair/typebox";
import { sql } from "drizzle-orm";
import {
  date,
  doublePrecision,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-typebox";

export const roles = ["nurse", "privileged"] as const;
export const pgRolesEnum = pgEnum("roles_enum", roles);

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => nursesTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
export const SessionSchema = createSelectSchema(sessionTable);
export type Session = Static<typeof SessionSchema>;

export const nursesTable = pgTable("nurses", {
  id: text("id").primaryKey().notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: pgRolesEnum("role").notNull().default("nurse"),
  createdAt: timestamp("created_at", { mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
export const NurseSchema = createSelectSchema(nursesTable);
export type Nurse = Static<typeof NurseSchema>;

export const nurseLocationsTable = pgTable(
  "nurse_locations",
  {
    id: text("id").primaryKey().notNull().$default(createId),
    nurseId: text("nurse_id")
      .notNull()
      .references(() => nursesTable.id)
      .unique(),
    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      idxLocationsNurseId: index("idx_locations_nurse_id").using(
        "btree",
        table.nurseId.asc().nullsLast()
      ),
    };
  }
);
export const NurseLocationSchema = createSelectSchema(nurseLocationsTable);
export type NurseLocation = Static<typeof NurseLocationSchema>;

export const nurseStatuses = ["available", "busy", "emergency", "off"] as const;
export const pgNurseStatusesEnum = pgEnum("nurse_statuses_enum", nurseStatuses);

export const nurseStatusTable = pgTable(
  "nurse_status",
  {
    id: text("id").primaryKey().notNull().$default(createId),
    nurseId: text("nurse_id")
      .notNull()
      .references(() => nursesTable.id)
      .unique(),
    status: pgNurseStatusesEnum("status").notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      idxStatusesNurseId: index("idx_statuses_nurse_id").using(
        "btree",
        table.nurseId.asc().nullsLast()
      ),
    };
  }
);
export const NurseStatusSchema = createSelectSchema(nurseStatusTable);
export type NurseStatus = Static<typeof NurseStatusSchema>;

export const suppliesTable = pgTable(
  "supplies",
  {
    id: text("id").primaryKey().notNull().$default(createId),
    name: varchar("name", { length: 50 }).notNull(),
    quantity: integer("quantity").notNull(),
    measurementUnit: varchar("measurement_unit", { length: 50 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      idxSupplyQuantity: index("idx_supply_quantity").using(
        "btree",
        table.quantity.asc().nullsLast()
      ),
    };
  }
);
export const SupplySchema = createSelectSchema(suppliesTable);
export type Supply = Static<typeof SupplySchema>;

export const patientsTable = pgTable("patients", {
  id: text("id").primaryKey().notNull().$default(createId),
  name: varchar("name", { length: 50 }).notNull(),
  age: integer("age").notNull(),
  sex: varchar("sex", { length: 10 }).notNull(),
  height: integer("height").notNull(),
  weight: integer("weight").notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at", { mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
export const PatientSchema = createSelectSchema(patientsTable);
export type Patient = Static<typeof PatientSchema>;

export const patientRecordsTable = pgTable(
  "patient_records",
  {
    id: text("id").primaryKey().notNull().$default(createId),
    patientId: text("patient_id")
      .notNull()
      .references(() => patientsTable.id),
    nurseId: text("nurse_id")
      .notNull()
      .references(() => nursesTable.id),
    recordDescription: text("record_description").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      idxPatientRecordsNurseId: index("idx_patient_records_nurse_id").using(
        "btree",
        table.nurseId.asc().nullsLast()
      ),
      idxPatientRecordsPatientId: index("idx_patient_records_patient_id").using(
        "btree",
        table.patientId.asc().nullsLast()
      ),
      idxPatientRecordsCreatedAt: index("idx_patient_records_created_at").on(
        table.createdAt.desc()
      ),
    };
  }
);
export const PatientRecordSchema = createSelectSchema(patientRecordsTable);
export type PatientRecord = Static<typeof PatientRecordSchema>;

export const healthcareFacilitiesTable = pgTable(
  "healthcare_facilities",
  {
    id: text("id").primaryKey().notNull().$default(createId),
    name: varchar("name", { length: 50 }).notNull(),
    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      idxHealthcareFacilitiesName: index(
        "idx_healthcare_facilities_name"
      ).using("btree", table.name.asc().nullsLast()),
    };
  }
);
export const HealthcareFacilitySchema = createSelectSchema(
  healthcareFacilitiesTable
);
export type HealthcareFacility = Static<typeof HealthcareFacilitySchema>;

export const urgentAreasTable = pgTable("urgent_areas", {
  id: text("id").primaryKey().notNull().$default(createId),
  name: varchar("name", { length: 50 }),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  radius: doublePrecision("radius").notNull(),
  createdAt: timestamp("created_at", { mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
export const UrgentAreaSchema = createSelectSchema(urgentAreasTable);
export type UrgentArea = Static<typeof UrgentAreaSchema>;

export const emergencyAlertsTable = pgTable(
  "emergency_alerts",
  {
    id: text("id").primaryKey().notNull().$default(createId),
    nurseId: text("nurse_id")
      .notNull()
      .references(() => nursesTable.id),
    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      idxEmergencyAlertsNurseId: index("idx_emergency_alerts_nurse_id").using(
        "btree",
        table.nurseId.asc().nullsLast()
      ),
    };
  }
);
export const EmergencyAlertSchema = createSelectSchema(emergencyAlertsTable);
export type EmergencyAlert = Static<typeof EmergencyAlertSchema>;

export const supplyRequestsTable = pgTable(
  "supply_requests",
  {
    id: text("id").primaryKey().notNull().$default(createId),
    nurseId: text("nurse_id")
      .notNull()
      .references(() => nursesTable.id),
    supplyId: text("supply_id")
      .notNull()
      .references(() => suppliesTable.id),
    quantity: integer("quantity").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      idxSupplyRequestsNurseId: index("idx_supply_requests_nurse_id").using(
        "btree",
        table.nurseId.asc().nullsLast()
      ),
    };
  }
);
export const SupplyRequestSchema = createSelectSchema(supplyRequestsTable);
export type SupplyRequest = Static<typeof SupplyRequestSchema>;

export const pgSenderEnum = pgEnum("sender_enum", ["nurse", "patient"]);
export const chatsTable = pgTable(
  "chats",
  {
    id: text("id").primaryKey().notNull().$default(createId),
    nurseId: text("nurse_id")
      .notNull()
      .references(() => nursesTable.id),
    patientId: text("patient_id")
      .notNull()
      .references(() => patientsTable.id),
    sender: pgSenderEnum("sender").notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      idxChatsNurseId: index("idx_chats_nurse_id").using(
        "btree",
        table.nurseId.asc().nullsLast()
      ),
      idxChatsPatientId: index("idx_chats_patient_id").using(
        "btree",
        table.patientId.asc().nullsLast()
      ),
      idxChatsCreatedAt: index("idx_chats_created_at").on(
        table.createdAt.desc()
      ),
    };
  }
);
export const ChatSchema = createSelectSchema(chatsTable, {
  sender: Type.Union([Type.Literal("nurse"), Type.Literal("patient")]),
});
export type Chat = Static<typeof ChatSchema>;

export const securityAuditsTable = pgTable("security_audits", {
  id: text("id").primaryKey().notNull().$default(createId),
  event: varchar("event", { length: 50 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
export const SecurityAuditSchema = createSelectSchema(securityAuditsTable);
export type SecurityAudit = Static<typeof SecurityAuditSchema>;

export const mentalHealthChecksTable = pgTable("mental_health_checks", {
  id: text("id").primaryKey().notNull().$default(createId),
  nurseId: text("nurse_id")
    .notNull()
    .references(() => nursesTable.id),
  checkDate: date("check_date").notNull(),
  mentalHealthStatus: varchar("mental_health_status", {
    length: 50,
  }).notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const MentalHealthCheckSchema = createSelectSchema(
  mentalHealthChecksTable
);
export type MentalHealthCheck = Static<typeof MentalHealthCheckSchema>;
