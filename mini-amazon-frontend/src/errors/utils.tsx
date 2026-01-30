import type { QueryErrorCode, ErrorDetail } from "@/errors/types";

type PartialErrorDetail = Omit<ErrorDetail, "issue">;
export const getErrorDetail = (
  code: QueryErrorCode,
  extra = {} as Record<QueryErrorCode, PartialErrorDetail>,
): PartialErrorDetail => {
  const defaultProps = {
    issue: "An unexpected system error occurred.",
    message: "Please refresh the page or try again later.",
    actions: ["REFRESH"],
  };

  const defaultMap: Record<QueryErrorCode, PartialErrorDetail> = {
    400: {
      cause: "The request was invalid.",
      message: "Please Check your input and try again.",
      actions: ["BACK"],
    },
    401: {
      cause: "Your session has expired.",
      message: "Please log in again.",
      actions: ["LOGIN"],
    },
    403: {
      cause: "You don't have permission for this.",
      message: "Please contact an admin if this is a mistake.",
      actions: ["HOME"],
    },
    404: {
      cause: "The requested resource was not found.",
      message: "Please verify the link or search again.",
      actions: ["BACK"],
    },

    500: {
      cause: "Our server is having trouble.",
      message: "We're working on it. Please try again in a few minutes.",
      actions: ["REFRESH", "CANCEL"],
    },

    FETCH_ERROR: {
      cause: "We can not connect to our servers.",
      message: "Please check your internet or try again later.",
      actions: ["REFRESH", "CANCEL"],
    },

    UNKOWN_ISSUE: {
      cause: "We are running into some unknown system issues.",
      message: "We're working on it. Please try again in a few minutes.",
      actions: ["REFRESH", "CANCEL"],
    },
  };

  return { ...defaultMap, ...extra }[code] || defaultProps;
};
