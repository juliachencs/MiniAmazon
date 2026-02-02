import type { QueryErrorAction, QueryErrorCode } from "@/errors/types";

export class QueryError extends Error {
  status: QueryErrorCode;
  issue: string;
  cause: string;
  message: string;
  actions: QueryErrorAction[];

  constructor(
    status: QueryErrorCode,
    issue: string,
    cause: string,
    message: string,
    actions: QueryErrorAction[],
  ) {
    // Call the parent Error constructor to initialize message and stack trace
    super(message, { cause });

    // Set the name property to the class name for better debugging and consistency
    this.name = "QueryError";
    this.status = status;
    this.issue = issue;
    this.cause = cause;
    this.message = message;
    this.actions = actions;
  }
}
