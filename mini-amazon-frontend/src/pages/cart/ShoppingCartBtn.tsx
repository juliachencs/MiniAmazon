import ShoppingCart from "@/pages/cart/ShopppingCart";
import { CloseOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import {
  Badge,
  Button,
  Flex,
  Popover,
  Typography,
  type PopoverProps,
} from "antd";
import { useCartItemCount } from "@/app/hooks";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import Checkout from "@/pages/cart/Checkout";

const popoverStyles: PopoverProps["styles"] = {
  container: {
    maxWidth: "90vw",
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

export default function ShoppingCartBtn() {
  const [visible, setVisible] = useState(false);
  const { count, mode } = useCartItemCount();
  const location = useLocation(); // Hook to access current location

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

  // Close the popover when the location (route) changes
  useEffect(() => {
    if (visible) {
      setVisible(false);
    }
  }, [location.pathname]);
  const content = <ShoppingCart />;
  //success | processing | default | error | warning
  // "uninitialized" | "loading" | "success" | "error";
  const status =
    mode === "uninitialized"
      ? "warning"
      : mode === "loading"
        ? "processing"
        : mode;

  return (
    <div>
      <Popover
        content={content}
        title={title}
        open={visible} // Control visibility with state
        onOpenChange={handleVisibleChange} // Update state when popover is opened/closed by trigger or outside click
        trigger="click"
        placement="bottomRight"
        styles={popoverStyles}
      >
        <Badge count={count} status={status} offset={[-10, 10]}>
          <Button type="text">
            <ShoppingCartOutlined /> Cart
          </Button>
        </Badge>
      </Popover>
    </div>
  );
}
