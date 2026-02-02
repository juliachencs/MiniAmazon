import { isAdmin, isGuest } from "@/app/utils";
import DelayedRedirect from "@/components/DelayedRedirect";
import { useRole } from "@/features/auth/authHooks";
import { Outlet } from "react-router-dom";

export function GuestOnly() {
  const { role } = useRole();
  if (isGuest(role)) {
    return <Outlet />;
  }
  return (
    <DelayedRedirect
      title="You have logged in!"
      redirect="/products"
    ></DelayedRedirect>
  );
}
export function AdminOnly() {
  const { role } = useRole();
  if (isAdmin(role)) {
    return <Outlet />;
  }

  return (
    <DelayedRedirect
      title="Sorry, you don't have the permission to access that page"
      redirect="/home"
    ></DelayedRedirect>
  );
}

export function AuthOnly() {
  const { role } = useRole();

  if (!isGuest(role)) {
    return <Outlet />;
  }
  return (
    <DelayedRedirect
      title="Sorry, you have to log in to get access to that page"
      redirect="/login"
    ></DelayedRedirect>
  );
}
