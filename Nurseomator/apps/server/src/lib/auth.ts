import { bearer } from "@elysiajs/bearer";
import { Elysia } from "elysia";

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
// export const protectedMiddleware: MiddlewareHandler = async (c, next) => {
//   if (whitelistedUrls.includes(new URL(c.req.url).pathname)) {
//     return next();
//   }

//   const bearer = bearerAuth({
//     verifyToken(token, c) {
//       return token === "secret";
//     },
//   });

//   try {
//     return await bearer(c, next);
//   } catch (error) {
//     throw new UnauthorizedError("Bearer token is invalid");
//   }
// };
