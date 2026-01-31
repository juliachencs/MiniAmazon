import { isGuest } from "@/app/utils";
import { useRole } from "@/features/auth/authHooks";
import {
  ClockCircleFilled,
  CloseOutlined,
  ExclamationCircleFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Flex,
  Popover,
  Tooltip,
  Typography,
  type PopoverProps,
} from "antd";
import { useState } from "react";

const popoverStyles: PopoverProps["styles"] = {
  container: {
    maxWidth: "min(90vw, 512px)",
    margin: "0px",
    padding: "0px",
  },

  title: {
    padding: "8px",
    margin: 0,
  },

  content: {
    padding: "8px",
  },
};

function AuthShoppingCartBtn() {
  const [visible, setVisible] = useState(false); // Visibility of the shoppoing cart
  const [count, setCount] = useState(0); // the total count of items in the cart
  const [status, setStatus] = useState("success"); // { count, mode } = useCartItemCount();

  // Function to hide the Popover
  const hidePopover = () => {
    setVisible(false);
  };

  // Function to handle the visibility change (e.g., when clicking the trigger button)
  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  const title = (
    <Flex justify="space-between" align="center">
      <Typography.Text> Cart</Typography.Text>
      <Button
        type="text"
        icon={<CloseOutlined />}
        onClick={() => hidePopover()}
      ></Button>
    </Flex>
  );

  const content = <> Popover content </>;

  const styledCount = (() => {
    switch (status) {
      case "idle":
        return <ClockCircleFilled style={{ color: "orange" }} />;
      case "error":
        return <ExclamationCircleFilled style={{ color: "red" }} />;
      default:
        return count;
    }
  })();

  return (
    <div>
      <Popover
        title={title}
        content={content}
        open={visible} // Control visibility with state
        onOpenChange={handleVisibleChange} // Update state when popover is opened/closed by trigger or outside click
        trigger="click"
        placement="bottomRight"
        styles={popoverStyles}
      >
        <Badge count={styledCount} offset={[-5, 5]} showZero color="blue">
          <Button type="text">
            <ShoppingCartOutlined /> Cart
          </Button>
        </Badge>
      </Popover>
    </div>
  );
}
function GuestCartBtn() {
  return (
    <Tooltip title="please login to activate shoppint cart">
      <Button type="text">
        <ShoppingCartOutlined /> Cart
      </Button>
    </Tooltip>
  );
}
export default function ShoppingCartButton() {
  const { role } = useRole();
  return isGuest(role) ? <GuestCartBtn /> : <AuthShoppingCartBtn />;
}
