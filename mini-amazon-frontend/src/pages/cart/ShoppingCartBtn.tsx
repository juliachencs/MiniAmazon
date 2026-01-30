import ShoppingCart from "@/pages/cart/ShopppingCart";
import { CloseOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import {
  Badge,
  Button,
  Flex,
  Popover,
  Tooltip,
  Typography,
  type PopoverProps,
} from "antd";
import { useAppDispatch, useCartItemCount, useRole } from "@/app/hooks";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import Checkout from "@/pages/cart/Checkout";
import { isGuest } from "@/app/utils";
import { cartThunks } from "@/features/cart/cartthunks";

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
  const [visible, setVisible] = useState(false);
  const { count, mode } = useCartItemCount();
  const location = useLocation(); // Hook to access current location

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("sAuthShoppingCartBtn UseEffect:", mode);
    if (mode === "uninitialized") {
      dispatch(cartThunks.getCart());
    }
  }, [mode]);

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
  const { role } = useRole();

  return isGuest(role) ? <GuestCartBtn /> : <AuthShoppingCartBtn />;
}
