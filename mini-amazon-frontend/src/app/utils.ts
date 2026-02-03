import { type ResponseWithData, type Role } from "@/app/types";

// Type guards
export function isResponseWithData(obj: unknown): obj is ResponseWithData {
  // Manually check for the existence and type of required properties
  return (
    !!obj &&
    typeof obj === "object" &&
    "success" in obj && // has success field
    obj.success === true && // Explicitly check for true
    Object.hasOwn(obj, "data") // has data field
  );
}

// roles
export function isAdmin(role: Role | null) {
  return role !== null && role === "Admin";
}

export function isRegular(role: Role | null) {
  return role !== null && role === "Regular";
}

export function isGuest(role: Role | null) {
  return role === null;
}

// configurations for different
export function getScreenType() {
  const width = window.innerWidth;
  let screenType = "xs";
  if (width > 576) {
    screenType = "sm";
  }
  if (width > 992) {
    screenType = "md";
  }
  return screenType;
}
