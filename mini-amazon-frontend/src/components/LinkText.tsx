import { Typography } from "antd";
import { Link, type LinkProps } from "react-router-dom";
import type { GetProps } from "antd";
interface LinkTextProps extends GetProps<typeof Typography.Text> {
  to: LinkProps["to"];
}

export default function LinkText({ to, children, ...props }: LinkTextProps) {
  return (
    <Link to={to}>
      <Typography.Text {...props}>{children}</Typography.Text>
    </Link>
  );
}
