import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { useMemo } from "react";

// Use throughout your app instead of plain useDispath and useSelector
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useRole = () => {
  const role = useAppSelector((state: RootState) => state.auth.role);
  return useMemo(() => ({ role }), [role]);
};

export const useToken = () => {
  const token = useAppSelector((state: RootState) => state.auth.token);
  return useMemo(() => ({ token }), [token]);
};

export const useCart = () => {
  const cart = useAppSelector((state: RootState) => state.cart);
  return useMemo(() => ({ cart }), [cart]);
};
