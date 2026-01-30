import { Button, type ButtonProps } from "antd";
import { Link, type LinkProps } from "react-router-dom";

interface LinkButtonProps extends ButtonProps {
  to: LinkProps["to"];
}

export default function LinkButton({
  to,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link to={to}>
      <Button {...props}>{children}</Button>
    </Link>
  );
}
