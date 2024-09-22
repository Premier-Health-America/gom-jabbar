import { faker } from "@faker-js/faker";
import {
  healthcareFacilitiesTable,
  HealthcareFacility,
  Nurse,
  NurseLocation,
  nurseLocationsTable,
  nursesTable,
  NurseStatus,
  nurseStatusTable,
  UrgentArea,
  urgentAreasTable,
} from "@repo/schemas/db";
import { generateIdFromEntropySize } from "lucia";
import { db } from ".";

const main = async () => {
  const nurses: Omit<Nurse, "createdAt" | "updatedAt">[] = [];
  for (let i = 0; i < 10; i++) {
    const name = faker.person.fullName();
    nurses.push({
      id: generateIdFromEntropySize(10),
      name,
      email: `${name
        .split(" ")
        .map((p) => p.toLowerCase())
        .join(".")}@nurseomator.com`,
      password: await Bun.password.hash("password"),
      role: "nurse",
      twoFactorSetupDone: false,
      twoFactorSecret: null,
    });
  }
  const nurseLocations: Omit<NurseLocation, "id" | "updatedAt">[] = [];
  for (const nurse of nurses) {
    nurseLocations.push({
      nurseId: nurse.id,
      latitude: faker.helpers.rangeToNumber({ min: 63, max: 68 }),
      longitude: faker.helpers.rangeToNumber({ min: -107, max: -104 }),
    });
  }

  const nurseStatuses: Omit<NurseStatus, "id" | "updatedAt">[] = [];
  for (const nurse of nurses) {
    nurseStatuses.push({
      nurseId: nurse.id,
      status: "available",
    });
  }

  const facilities: Omit<
    HealthcareFacility,
    "id" | "createdAt" | "updatedAt"
  >[] = [];
  for (let i = 0; i < 3; i++) {
    facilities.push({
      name: `Facility ${i}`,
      latitude: faker.helpers.rangeToNumber({ min: 64, max: 66 }),
      longitude: faker.helpers.rangeToNumber({ min: -105.6, max: -103.8 }),
    });
  }

  const urgentAreas: Omit<UrgentArea, "id" | "createdAt" | "updatedAt">[] = [];
  for (let i = 0; i < 5; i++) {
    urgentAreas.push({
      name: `Urgent Area ${i}`,
      latitude: faker.helpers.rangeToNumber({ min: 64, max: 66 }),
      longitude: faker.helpers.rangeToNumber({ min: -105.6, max: -103.8 }),
      radius: faker.helpers.rangeToNumber({ min: 1000, max: 2000 }),
    });
  }
  await db.transaction(async (tx) => {
    await tx.insert(nursesTable).values(nurses);
    await tx.insert(nurseLocationsTable).values(nurseLocations);
    await tx.insert(nurseStatusTable).values(nurseStatuses);
    await tx.insert(healthcareFacilitiesTable).values(facilities);
    await tx.insert(urgentAreasTable).values(urgentAreas);
  });
};

main()
  .then(() => {
    console.log("Seeding complete");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
  });
