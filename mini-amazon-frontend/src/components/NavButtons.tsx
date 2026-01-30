import { Button, type ButtonProps } from "antd";
import { Link, type LinkProps } from "react-router-dom";

interface LinkButtonProps extends ButtonProps {
  to: LinkProps["to"];
}

export default function NavButton({ to, children, ...props }: LinkButtonProps) {
  return (
    <Link to={to}>
      <Button {...props}>{children}</Button>
    </Link>
  );
}

export function HomeButton({ ...props }) {
  return (
    <NavButton to="/" {...props}>
      Home
    </NavButton>
  );
}

export function BrowerProductsButton({ ...props }) {
  return (
    <NavButton to="/products" {...props}>
      Browser Products
    </NavButton>
  );
}

export function LoginButton({ ...props }) {
  return (
    <NavButton to="/Login" {...props}>
      Sign in
    </NavButton>
  );
}
