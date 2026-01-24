import { Button, Typography } from "antd";

export function GoHomeButton() {
  return (
    <Button type="primary" href="/">
      {" "}
      Go Home{" "}
    </Button>
  );
}

export function LargeHomeLogo() {
  return <Typography.Link href="/">MiniAmazon</Typography.Link>;
}

export function MiniHomeLogo() {
  return <Typography.Link href="/">MiniA</Typography.Link>;
}
