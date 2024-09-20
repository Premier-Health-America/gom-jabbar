import { nursesTable } from "@repo/schemas/db";
import Elysia, { t } from "elysia";
import { generateIdFromEntropySize } from "lucia";
import { db } from "../db";
import { lucia } from "../lib/auth";
import { InternalServerError } from "../lib/error";

const router = new Elysia({ prefix: "/auth" })
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
          set.status = 400;
          return {
            error: "An account with this email already exists. Sign in instead",
          };
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
        });

        const session = await lucia.createSession(userId, {});
        set.status = 201;
        return {
          message: "Account created successfully",
          token: session.id,
        };
      } catch (err) {
        console.log("CATCHED SIGNUP ERROR:\n", err);
        return error(
          500,
          new InternalServerError(
            "Something went wrong",
            `Catched error during signup: ${err}`
          )
        );
      }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1, maxLength: 50 }),
        email: t.String({ format: "email", minLength: 1, maxLength: 100 }),
        password: t.String({ minLength: 8, maxLength: 255 }),
      }),
    }
  )
  .post(
    "/signin",
    async ({ body, error, set }) => {
      try {
        const existingUser = await db.query.nursesTable.findFirst({
          where(fields, operators) {
            return operators.eq(fields.email, body.email);
          },
        });
        if (!existingUser) {
          set.status = 400;
          return {
            error: "Invalid email or password",
          };
        }

        const validPassword = await Bun.password.verify(
          body.password,
          existingUser.password
        );
        if (!validPassword) {
          set.status = 400;
          return {
            error: "Invalid email or password",
          };
        }

        const session = await lucia.createSession(existingUser.id, {});
        set.status = 201;
        return {
          message: "Logged in successfully",
          token: session.id,
        };

        // Implement TOTP redirection here
      } catch (err) {
        console.log("CATCHED LOGIN ERROR:\n", err);
        return error(
          500,
          new InternalServerError(
            "Something went wrong",
            `Catched error during login: ${err}`
          )
        );
      }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1, maxLength: 50 }),
        email: t.String({ format: "email", minLength: 1, maxLength: 100 }),
        password: t.String({ minLength: 8, maxLength: 255 }),
      }),
    }
  );

export { router as authRouter };
