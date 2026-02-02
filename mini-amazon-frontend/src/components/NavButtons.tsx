//import router from "@/app/router";
import { Button, type ButtonProps } from "antd";
import { useNavigate, type LinkProps } from "react-router-dom";

interface LinkButtonProps extends ButtonProps {
  to: LinkProps["to"];
}

export default function NavButton({ to, children, ...props }: LinkButtonProps) {
  const navigate = useNavigate();
  return (
    <Button {...props} onClick={() => navigate(to)}>
      {children}
    </Button>
  );
  // return (
  //   <Button {...props} onClick={() => router.navigate(to)}>
  //     {children}
  //   </Button>
  // );
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

export function BackButton({ ...props }) {
  const navigate = useNavigate();
  return (
    <Button {...props} onClick={() => navigate(-1)}>
      Back
    </Button>
  );
}
