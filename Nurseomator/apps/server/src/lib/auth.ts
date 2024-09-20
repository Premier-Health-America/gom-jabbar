import { bearer } from "@elysiajs/bearer";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Nurse, nursesTable, Session, sessionTable } from "@repo/schemas/db";
import { Elysia } from "elysia";
import { Lucia } from "lucia";
import { db } from "../db";
import { env } from "./env";

export const lucia = new Lucia(
  new DrizzlePostgreSQLAdapter(db, sessionTable, nursesTable),
  {
    sessionCookie: {
      attributes: {
        secure: env.ENVIRONMENT === "production",
      },
    },
    getUserAttributes(databaseUserAttributes) {
      return {
        name: databaseUserAttributes.name,
        email: databaseUserAttributes.email,
        createdAt: databaseUserAttributes.createdAt,
        updatedAt: databaseUserAttributes.updatedAt,
        twoFactorSetupDone: databaseUserAttributes.twoFactorSetupDone,
      };
    },
    getSessionAttributes(databaseSessionAttributes) {
      return databaseSessionAttributes;
    },
  }
);

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
  }
  type DatabaseUserAttributes = Omit<Nurse, "password">;
  type DatabaseSessionAttributes = Omit<Session, "id" | "userId" | "expiresAt">;
}

export const TEMP_2FA_COOKIE_NAME = "2fa_session";

const whitelistedUrls: string[] = ["/api/v1/health"];

const app = new Elysia().use(bearer()).get("/sign", ({ bearer }) => bearer, {
  beforeHandle({ bearer, set }) {
    if (!bearer) {
      set.status = 400;
      set.headers[
        "WWW-Authenticate"
      ] = `Bearer realm='sign', error="invalid_request"`;

      return "Unauthorized";
    }
  },
});
