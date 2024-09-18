import Elysia, { t } from "elysia";
import { BadRequestError, ValidationIssue } from "../lib/error";
import { locationRouter } from "./location";

const ErrorBody = t.Object(
  {
    name: t.String({
      minLength: 5,
      error: ValidationIssue("name", "Name must be at least 5 characters long"),
    }),
    message: t.String({
      minLength: 3,
      error: ValidationIssue(
        "message",
        "Message must be at least 3 characters long"
      ),
    }),
  },
  {
    error: ValidationIssue("body", "Body must be an object"),
  }
);

export const api = new Elysia({ prefix: "/api/v1" })
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      console.log("HERE Error");
      set.headers["content-type"] = "application/json";
      for (const e of error.all) {
        if (!e.summary) continue;
        console.log("e: ", e.schema.error);
      }
      return error.all;
    }
  })
  .onTransform((c) => {
    // console.log("Transform");
    // console.log(c);
  })
  .onAfterResponse((c) => {
    // console.log("After Response");
    // console.log(c);
    // console.log("ERROR", c.error);
  })
  .get("/health", () => "OK", {
    detail: {
      description: "Test connectivity to the REST API",
    },
    response: t.String(),
  })
  .use(locationRouter)
  .compile();
