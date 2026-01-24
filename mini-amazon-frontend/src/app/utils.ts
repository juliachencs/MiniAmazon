import type { Role } from "@/app/types";

// roles
export function isAdmin(role: Role | null) {
  return role !== null && role === "ADMIN";
}

export function isRegular(role: Role | null) {
  return role !== null && role === "REGULAR";
}

export function isGuest(role: Role | null) {
  return role === null;
}

export const MakeProductLink = (id: string): string => {
  return `/products/item/${id}`;
};

export const getErrorProps = (error: any) => {
  const status = error?.status;

  const defaultProps = {
    issue: "An unexpected system error occurred.",
    suggestion: "Please refresh the page or try again later.",
  };

  const statusMap: Record<
    number | string,
    { issue: string; suggestion: string }
  > = {
    400: {
      issue: "The request was invalid.",
      suggestion: "Please Check your input and try again.",
    },
    401: {
      issue: "Your session has expired.",
      suggestion: "Please log in again.",
    },
    403: {
      issue: "You don't have permission for this.",
      suggestion: "Please contact an admin if this is a mistake.",
    },
    404: {
      issue: "The requested resource was not found.",
      suggestion: "Please verify the link or search again.",
    },
    500: {
      issue: "Our server is having trouble.",
      suggestion: "We're working on it. Please try again in a few minutes.",
    },

    FETCH_ERROR: {
      issue: "We're having trouble connecting to our servers.",
      suggestion: "Please check your internet and try again.",
    },

    UNKOWN_ISSUE: {
      issue: "We are running into some unknown system issues.",
      suggestion: "We're working on it. Please try again in a few minutes.",
    },
  };

  return statusMap[status] || defaultProps;
};
