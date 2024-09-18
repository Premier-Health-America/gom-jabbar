import Elysia, { t } from "elysia";
import type {NurseLocation} from "@repo/schemas"


// In-memory storage for nurse locations (replace with a database in production)
const nurseLocations: Map<string, NurseLocation> = new Map();

const router = new Elysia()
  .get('/nurse-locations', () => {
    return Array.from(nurseLocations.values());
  })
  .post(
    '/nurse-locations',
    ({ body }) => {
      const { id, name, latitude, longitude, status } = body;
      nurseLocations.set(id, {
        id,
        name,
        latitude,
        longitude,
        status,
        lastUpdated: new Date(),
      });
      return { success: true, message: 'Location updated successfully' };
    },
    {
      body: t.Object({
        id: t.String(),
        name: t.String(),
        latitude: t.Number(),
        longitude: t.Number(),
        status: t.String(),
      }),
    }
  )


export {router as locationRouter}
