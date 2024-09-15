import { z, ZodError, ZodIssue } from "zod";

type AppErrorIssue = {
  key: string;
  message: string;
};

export class AppError extends Error {
  status: number;
  traceId: string;
  message: string;
  issues: AppErrorIssue[];

  constructor(message: string, name: string, cause: string, status: number) {
    super(message, { cause });
    this.issues = [];
    this.message = message;
    this.name = name;
    this.status = status;
    this.traceId = crypto.randomUUID();
  }

  [Symbol.toString()]() {
    return this.toString();
  }

  toString() {
    const sb = [];
    sb.push("AppError");
    sb.push(
      JSON.stringify(
        {
          name: this.name,
          message: this.message,
          cause: this.cause,
          status: this.status,
          traceId: this.traceId,
          issues: this.issues,
        },
        null,
        2
      )
    );
    return sb.join("\n");
  }
}

export class ValidationError extends AppError {
  issues: AppErrorIssue[];
  constructor(error: ZodError, message: string = "Validation error") {
    super(message, "ValidationError", "Validation error", 400);
    this.issues = this.formatIssues(error.issues);
  }

  private formatIssues = (issues: ZodIssue[]) => {
    return issues.map((i) => ({
      key: i.path[0].toString(),
      message: i.message,
    })) satisfies AppErrorIssue[];
  };

  static openApi = {
    description: "Validation error",
    content: {
      "application/json": {
        schema: z.object({
          message: z.string().openapi({ example: "Validation error" }),
          status: z.number().openapi({ example: 400 }),
          traceId: z
            .string()
            .openapi({ example: "e5ab1ef5-4f8a-4e31-8683-730fcf82072a" }),
          issues: z
            .array(z.object({ key: z.string(), message: z.string() }))
            .openapi({
              example: [
                { key: "name", message: "must be at least 3 characters long" },
              ],
            }),
        }),
      },
    },
  };
}

export class UnauthorizedError extends AppError {
  constructor(cause: string = "Unauthorized") {
    super("Unauthorized", "UnauthorizedError", cause, 401);
  }

  static openApi = {
    description: "Unauthorized",
    content: {
      "application/json": {
        schema: z.object({
          message: z.string().openapi({ example: "Unauthorized" }),
          status: z.number().openapi({ example: 401 }),
          traceId: z
            .string()
            .openapi({ example: "e5ab1ef5-4f8a-4e31-8683-730fcf82072a" }),
          issues: z
            .array(z.object({ key: z.string(), message: z.string() }))
            .openapi({
              example: [],
            }),
        }),
      },
    },
  };
}

export class NotFoundError extends AppError {
  constructor(message: string, cause: string = "Not found") {
    super(message, "NotFoundError", cause, 404);
  }

  static openApi = {
    description: "Not found",
    content: {
      "application/json": {
        schema: z.object({
          message: z.string().openapi({ example: "Ressource Not found" }),
          status: z.number().openapi({ example: 404 }),
          traceId: z
            .string()
            .openapi({ example: "e5ab1ef5-4f8a-4e31-8683-730fcf82072a" }),
          issues: z
            .array(z.object({ key: z.string(), message: z.string() }))
            .openapi({
              example: [],
            }),
        }),
      },
    },
  };
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden", cause: string = "No permission") {
    super(message, "ForbiddenError", cause, 403);
  }

  static openApi = {
    description: "Forbidden",
    content: {
      "application/json": {
        schema: z.object({
          message: z.string().openapi({ example: "Forbidden" }),
          status: z.number().openapi({ example: 403 }),
          traceId: z
            .string()
            .openapi({ example: "e5ab1ef5-4f8a-4e31-8683-730fcf82072a" }),
          issues: z
            .array(z.object({ key: z.string(), message: z.string() }))
            .openapi({
              example: [],
            }),
        }),
      },
    },
  };
}

export class BadRequestError extends AppError {
  constructor(message: string = "Bad Request", cause: string = "Bad request") {
    super(message, "BadRequestError", cause, 400);
  }

  static openApi = {
    description: "Bad request",
    content: {
      "application/json": {
        schema: z.object({
          message: z.string().openapi({ example: "Bad request" }),
          status: z.number().openapi({ example: 400 }),
          traceId: z
            .string()
            .openapi({ example: "e5ab1ef5-4f8a-4e31-8683-730fcf82072a" }),
          issues: z
            .array(z.object({ key: z.string(), message: z.string() }))
            .openapi({
              example: [],
            }),
        }),
      },
    },
  };
}

export class InternalServerError extends AppError {
  constructor(message: string = "Something went wrong", cause: string) {
    super(message, "InternalServerError", cause, 500);
  }

  static openApi = {
    description: "Internal server error",
    content: {
      "application/json": {
        schema: z.object({
          message: z.string().openapi({ example: "Internal server error" }),
          status: z.number().openapi({ example: 500 }),
          traceId: z
            .string()
            .openapi({ example: "e5ab1ef5-4f8a-4e31-8683-730fcf82072a" }),
          issues: z
            .array(z.object({ key: z.string(), message: z.string() }))
            .openapi({
              example: [],
            }),
        }),
      },
    },
  };
}
