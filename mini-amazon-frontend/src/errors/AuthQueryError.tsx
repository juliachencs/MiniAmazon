import type {
  AuthQueryTask,
  QueryErrorCode,
  QueryErrorDetails,
} from "@/errors/types";
import { QueryError } from "@/errors/QueryError";
import { getErrorDetail } from "@/errors/utils";

export class AuthQueryError extends QueryError {
  constructor(task: AuthQueryTask, code: QueryErrorCode) {
    const issues: Record<AuthQueryTask, string> = {
      LOGIN: "Fail to login",
      SIGNUP: "Fail to sign up",
      SIGNOUT: "Fail to sign out",
      RECOVER: "Fail to recover password",
    };
    const issue = issues[task];

    const details: Record<QueryErrorCode, QueryErrorDetails> = {
      400: {
        cause: "Email and password doesn't match!",
        message: "Please Check your input and try again.",
        actions: ["BACK"],
      },

      404: {
        cause: "The email address is not found!",
        message: "Please Check your input and try again.",
        actions: ["BACK"],
      },

      409: {
        cause: "The email has been registered",
        message:
          "You could try to login with that email. Or cancel to sign up with other email.",
        actions: ["LOGIN", "CANCEL"],
      },
    };

    const { cause, message, actions } = getErrorDetail(code, details);

    super(code, issue, cause, message, actions);
  }
}
