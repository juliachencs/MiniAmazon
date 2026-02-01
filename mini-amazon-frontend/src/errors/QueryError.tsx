import type { QueryErrorAction } from "@/errors/types";

export class QueryError extends Error {
  issue: string;
  cause: string;
  message: string;
  actions: QueryErrorAction[];

  constructor(
    issue: string,
    cause: string,
    message: string,
    actions: QueryErrorAction[],
  ) {
    // Call the parent Error constructor to initialize message and stack trace
    super(message, { cause });

    // Set the name property to the class name for better debugging and consistency
    this.name = "QueryError";
    this.issue = issue;
    this.cause = cause;
    this.message = message;
    this.actions = actions;
  }
}
