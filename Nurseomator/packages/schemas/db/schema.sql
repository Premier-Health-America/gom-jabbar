-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "interactions" (
	"id" text PRIMARY KEY NOT NULL,
	"nurse_id" text NOT NULL,
	"patient_id" text NOT NULL,
	"interaction_type" varchar(20) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "healthcare_facilities" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"latitude" numeric(10, 8) NOT NULL,
	"longitude" numeric(11, 8) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "patients" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"age" integer NOT NULL,
	"sex" varchar(10) NOT NULL,
	"height" numeric(10, 2) NOT NULL,
	"weight" numeric(10, 2) NOT NULL,
	"email" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "patients_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nurse_locations" (
	"id" text PRIMARY KEY NOT NULL,
	"nurse_id" text NOT NULL,
	"latitude" numeric(10, 8) NOT NULL,
	"longitude" numeric(11, 8) NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "nurse_locations_nurse_id_unique" UNIQUE("nurse_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "patient_records" (
	"id" text PRIMARY KEY NOT NULL,
	"patient_id" text NOT NULL,
	"nurse_id" text NOT NULL,
	"record_description" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mental_health_checks" (
	"id" text PRIMARY KEY NOT NULL,
	"nurse_id" text NOT NULL,
	"check_date" date NOT NULL,
	"mental_health_status" varchar(50) NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nurse_status" (
	"id" text PRIMARY KEY NOT NULL,
	"nurse_id" text NOT NULL,
	"status" "statuses_enum" NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "nurse_status_nurse_id_unique" UNIQUE("nurse_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "security_audits" (
	"id" text PRIMARY KEY NOT NULL,
	"event" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nurses" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "roles_enum" DEFAULT 'nurse' NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "nurses_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "supplies" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"quantity" integer NOT NULL,
	"mesurement_unit" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "urgent_areas" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(50),
	"latitude" numeric(10, 8) NOT NULL,
	"longitude" numeric(11, 8) NOT NULL,
	"radius" numeric(10, 8) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "emergency_alerts" (
	"id" text PRIMARY KEY NOT NULL,
	"nurse_id" text NOT NULL,
	"latitude" numeric(10, 8) NOT NULL,
	"longitude" numeric(11, 8) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "supply_requests" (
	"id" text PRIMARY KEY NOT NULL,
	"nurse_id" text NOT NULL,
	"supply_id" text NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint

 ALTER TABLE "interactions" ADD CONSTRAINT "interactions_nurse_id_nurses_id_fk" FOREIGN KEY ("nurse_id") REFERENCES "public"."nurses"("id") ON DELETE no action ON UPDATE no action;



--> statement-breakpoint

 ALTER TABLE "interactions" ADD CONSTRAINT "interactions_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;



--> statement-breakpoint

 ALTER TABLE "nurse_locations" ADD CONSTRAINT "nurse_locations_nurse_id_nurses_id_fk" FOREIGN KEY ("nurse_id") REFERENCES "public"."nurses"("id") ON DELETE no action ON UPDATE no action;



--> statement-breakpoint

 ALTER TABLE "patient_records" ADD CONSTRAINT "patient_records_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;



--> statement-breakpoint

 ALTER TABLE "patient_records" ADD CONSTRAINT "patient_records_nurse_id_nurses_id_fk" FOREIGN KEY ("nurse_id") REFERENCES "public"."nurses"("id") ON DELETE no action ON UPDATE no action;



--> statement-breakpoint

 ALTER TABLE "mental_health_checks" ADD CONSTRAINT "mental_health_checks_nurse_id_nurses_id_fk" FOREIGN KEY ("nurse_id") REFERENCES "public"."nurses"("id") ON DELETE no action ON UPDATE no action;



--> statement-breakpoint

 ALTER TABLE "nurse_status" ADD CONSTRAINT "nurse_status_nurse_id_nurses_id_fk" FOREIGN KEY ("nurse_id") REFERENCES "public"."nurses"("id") ON DELETE no action ON UPDATE no action;



--> statement-breakpoint

 ALTER TABLE "emergency_alerts" ADD CONSTRAINT "emergency_alerts_nurse_id_nurses_id_fk" FOREIGN KEY ("nurse_id") REFERENCES "public"."nurses"("id") ON DELETE no action ON UPDATE no action;



--> statement-breakpoint

 ALTER TABLE "supply_requests" ADD CONSTRAINT "supply_requests_nurse_id_nurses_id_fk" FOREIGN KEY ("nurse_id") REFERENCES "public"."nurses"("id") ON DELETE no action ON UPDATE no action;



--> statement-breakpoint

 ALTER TABLE "supply_requests" ADD CONSTRAINT "supply_requests_supply_id_supplies_id_fk" FOREIGN KEY ("supply_id") REFERENCES "public"."supplies"("id") ON DELETE no action ON UPDATE no action;



--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_interactions_nurse_id" ON "interactions" USING btree ("nurse_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_interactions_patient_id" ON "interactions" USING btree ("patient_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_healthcare_facilities_name" ON "healthcare_facilities" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_locations_nurse_id" ON "nurse_locations" USING btree ("nurse_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_patient_records_nurse_id" ON "patient_records" USING btree ("nurse_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_patient_records_patient_id" ON "patient_records" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_statuses_nurse_id" ON "nurse_status" USING btree ("nurse_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_supply_quantity" ON "supplies" USING btree ("quantity");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_emergency_alerts_nurse_id" ON "emergency_alerts" USING btree ("nurse_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_supply_requests_nurse_id" ON "supply_requests" USING btree ("nurse_id");

*/