import type { ResponseWithData } from "@/app/types";

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
