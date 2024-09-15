import { MiddlewareHandler } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { UnauthorizedError } from "./error";

const whitelistedUrls: string[] = ["/api/v1/health"];

export const protectedMiddleware: MiddlewareHandler = async (c, next) => {
  if (whitelistedUrls.includes(new URL(c.req.url).pathname)) {
    return next();
  }

  const bearer = bearerAuth({
    verifyToken(token, c) {
      return token === "secret";
    },
  });

  try {
    return await bearer(c, next);
  } catch (error) {
    throw new UnauthorizedError("Bearer token is invalid");
  }
};
