import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

function GuestCartBtn() {
  return (
    <Tooltip title="please login to activate shoppint cart">
      <Button type="text">
        <ShoppingCartOutlined /> Cart
      </Button>
    </Tooltip>
  );
}
export default function ShoppingCartBtn() {
  return <GuestCartBtn />;
}
