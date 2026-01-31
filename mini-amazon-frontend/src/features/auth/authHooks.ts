import { useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { useMemo } from "react";

export const useRole = () => {
  const role = useAppSelector((state: RootState) => state.auth.role);
  return useMemo(() => ({ role }), [role]);
};
