import bearer from "@elysiajs/bearer";
import {
  nurseLocationsTable,
  nursesTable,
  nurseStatusTable,
} from "@repo/schemas/db";
import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { generateIdFromEntropySize } from "lucia";
import { db } from "../db";
import { lucia } from "../lib/auth";
import { AppErrorModels } from "../lib/error";

export const authService = new Elysia({ name: "auth/service" })
  .use(bearer())
  .use(AppErrorModels)
  .macro(({ onBeforeHandle }) => ({
    isSignIn(enabled: true) {
      if (!enabled) return;

      onBeforeHandle(({ error, bearer, set }) => {
        if (!bearer) {
          set.headers[
            "WWW-Authenticate"
          ] = `Bearer realm='sign', error="invalid_request"`;
          return error(401, "Unauthorized");
        }
      });
    },
  }));

export const authenticatedPlugin = new Elysia()
  .use(authService)
  .guard({
    isSignIn: true,
  })
  .resolve(async ({ bearer, error }) => {
    const { session, user } = await lucia.validateSession(`${bearer}`);
    if (!session || !user) {
      return error(401, "Unauthorized");
    }

    return { session, user };
  })
  .as("plugin");

const router = new Elysia({ prefix: "/auth" })
  .use(authService)
  .model({
    signUp: t.Object({
      name: t.String({ minLength: 1, maxLength: 50, examples: ["Sylvie"] }),
      email: t.String({
        format: "email",
        minLength: 1,
        maxLength: 100,
        examples: ["sylvie@nurseomator.com"],
      }),
      password: t.String({
        minLength: 8,
        maxLength: 255,
        examples: ["strongpassword"],
      }),
    }),
    signIn: t.Object({
      email: t.String({
        format: "email",
        minLength: 1,
        maxLength: 100,
        examples: ["sylvie@nurseomator.com"],
      }),
      password: t.String({
        minLength: 8,
        maxLength: 255,
        examples: ["strongpassword"],
      }),
    }),
  })
  .post(
    "/signup",
    async ({ body, error, set }) => {
      try {
        const existingUser = await db.query.nursesTable.findFirst({
          where(fields, operators) {
            return operators.eq(fields.email, body.email);
          },
        });
        if (existingUser) {
          return error(
            400,
            "An account with this email already exists. Sign in instead"
          );
        }

        const passwordHash = await Bun.password.hash(body.password);
        const userId = generateIdFromEntropySize(10);

        await db.transaction(async (tx) => {
          await tx.insert(nursesTable).values({
            id: userId,
            name: body.name,
            email: body.email,
            password: passwordHash,
            role: "nurse",
            twoFactorSetupDone: false,
            twoFactorSecret: null,
          });
          await tx.insert(nurseStatusTable).values({
            nurseId: userId,
            status: "available",
          });
          await tx.insert(nurseLocationsTable).values({
            nurseId: userId,
            latitude: 0,
            longitude: 0,
          });
        });

        const session = await lucia.createSession(userId, {});
        return {
          token: session.id,
        };
      } catch (err) {
        console.log("CATCHED SIGNUP ERROR:\n", err);
        return error(500, "Something went wrong");
      }
    },
    {
      body: "signUp",
      response: {
        200: t.Object({
          token: t.String(),
        }),
        400: t.Literal(
          "An account with this email already exists. Sign in instead",
          {
            examples: [
              "An account with this email already exists. Sign in instead",
            ],
          }
        ),
        500: "InternalServerError",
      },
    }
  )
  .post(
    "/signin",
    async ({ body, error }) => {
      try {
        const existingUser = await db.query.nursesTable.findFirst({
          where(fields, operators) {
            return operators.eq(fields.email, body.email);
          },
        });
        if (!existingUser) {
          return error(400, "Invalid email or password.");
        }

        const validPassword = await Bun.password.verify(
          body.password,
          existingUser.password
        );
        if (!validPassword) {
          return error(400, "Invalid email or password.");
        }

        await db
          .update(nurseStatusTable)
          .set({ status: "available" })
          .where(eq(nurseStatusTable.nurseId, existingUser.id));
        const session = await lucia.createSession(existingUser.id, {});
        return {
          token: session.id,
        };

        // Implement TOTP redirection here
      } catch (err) {
        console.log("CATCHED LOGIN ERROR:\n", err);
        return error(500, "Something went wrong");
      }
    },
    {
      body: t.Object({
        email: t.String({ format: "email", minLength: 1, maxLength: 100 }),
        password: t.String({ minLength: 8, maxLength: 255 }),
      }),
      response: {
        200: t.Object({
          token: t.String(),
        }),
        400: t.Literal("Invalid email or password."),
        500: "InternalServerError",
      },
    }
  )
  .get(
    "/signout",
    async ({ bearer, set }) => {
      await lucia.invalidateSession(`${bearer}`);
      set.status = 204;
    },
    {
      response: {
        204: t.Void(),
      },
    }
  );

export { router as authRouter };
