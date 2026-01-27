import LinkButton from "@/components/LinkButton";
import { Typography } from "antd";
import { Link } from "react-router-dom";

export function GoHomeButton() {
  return (
    <LinkButton type="primary" to="/">
      {" "}
      Homepage{" "}
    </LinkButton>
  );
}

export function LargeHomeLogo() {
  return (
    <Typography.Link>
      <Link to="/"> MiniAmazon </Link>
    </Typography.Link>
  );
}

export function MiniHomeLogo() {
  return (
    <Typography.Link>
      <Link to="/"> MiniA</Link>
    </Typography.Link>
  );
}
