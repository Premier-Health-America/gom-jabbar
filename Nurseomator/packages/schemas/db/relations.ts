import { relations } from "drizzle-orm/relations";
import {
  chatsTable,
  emergencyAlertsTable,
  mentalHealthChecksTable,
  nurseLocationsTable,
  nursesTable,
  nurseStatusTable,
  patientRecordsTable,
  patientsTable,
  suppliesTable,
  supplyRequestsTable,
} from "./schema";

export const chatsRelations = relations(chatsTable, ({ one }) => ({
  nurse: one(nursesTable, {
    fields: [chatsTable.nurseId],
    references: [nursesTable.id],
  }),
  patient: one(patientsTable, {
    fields: [chatsTable.patientId],
    references: [patientsTable.id],
  }),
}));

export const nursesRelations = relations(nursesTable, ({ many, one }) => ({
  chats: many(chatsTable),
  location: one(nurseLocationsTable, {
    fields: [nursesTable.id],
    references: [nurseLocationsTable.nurseId],
  }),
  status: one(nurseStatusTable, {
    fields: [nursesTable.id],
    references: [nurseStatusTable.nurseId],
  }),
  patientRecords: many(patientRecordsTable),
  mentalHealthChecks: many(mentalHealthChecksTable),
  emergencyAlerts: many(emergencyAlertsTable),
  supplyRequests: many(supplyRequestsTable),
}));

export const patientsRelations = relations(patientsTable, ({ many }) => ({
  chats: many(chatsTable),
  patientRecords: many(patientRecordsTable),
}));

export const nurseLocationsRelations = relations(
  nurseLocationsTable,
  ({ one }) => ({
    nurse: one(nursesTable, {
      fields: [nurseLocationsTable.nurseId],
      references: [nursesTable.id],
    }),
  })
);

export const patientRecordsRelations = relations(
  patientRecordsTable,
  ({ one }) => ({
    patient: one(patientsTable, {
      fields: [patientRecordsTable.patientId],
      references: [patientsTable.id],
    }),
    nurse: one(nursesTable, {
      fields: [patientRecordsTable.nurseId],
      references: [nursesTable.id],
    }),
  })
);

export const mentalHealthChecksRelations = relations(
  mentalHealthChecksTable,
  ({ one }) => ({
    nurse: one(nursesTable, {
      fields: [mentalHealthChecksTable.nurseId],
      references: [nursesTable.id],
    }),
  })
);

export const nurseStatusRelations = relations(nurseStatusTable, ({ one }) => ({
  nurse: one(nursesTable, {
    fields: [nurseStatusTable.nurseId],
    references: [nursesTable.id],
  }),
}));

export const emergencyAlertsRelations = relations(
  emergencyAlertsTable,
  ({ one }) => ({
    nurse: one(nursesTable, {
      fields: [emergencyAlertsTable.nurseId],
      references: [nursesTable.id],
    }),
  })
);

export const supplyRequestsRelations = relations(
  supplyRequestsTable,
  ({ one }) => ({
    nurse: one(nursesTable, {
      fields: [supplyRequestsTable.nurseId],
      references: [nursesTable.id],
    }),
    supply: one(suppliesTable, {
      fields: [supplyRequestsTable.supplyId],
      references: [suppliesTable.id],
    }),
  })
);

export const suppliesRelations = relations(suppliesTable, ({ many }) => ({
  supplyRequestsTable: many(supplyRequestsTable),
}));
