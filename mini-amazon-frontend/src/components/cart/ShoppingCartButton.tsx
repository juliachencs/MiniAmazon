import { useAppDispatch } from "@/app/hooks";
import { isGuest } from "@/app/utils";
import ShoppingCart from "@/components/cart/ShopppingCart";
import { useRole } from "@/features/auth/authHooks";
import { useCartItemsCount } from "@/features/cart/cartHooks";
import { cartThunks } from "@/features/cart/cartThunks";

import {
  ClockCircleFilled,
  CloseOutlined,
  ExclamationCircleFilled,
  ShoppingCartOutlined,
  SyncOutlined,
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
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
  const location = useLocation(); // Hook to access current location
  const [visible, setVisible] = useState(false); // the visibility of the popover shoppoing cart
  const dispatch = useAppDispatch();

  // retrieve data from store
  const { status, count } = useCartItemsCount();

  // Function to hide the Popover
  const hidePopover = () => {
    setVisible(false);
  };

  // Function to handle the visibility change (e.g., when clicking the trigger button)
  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
    if (newVisible) {
      console.log("I am open");
      dispatch(cartThunks.getCart());
    }
  };

  //close when navigate to other page
  useEffect(() => {
    setVisible(false);
  }, [location.pathname]);

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

  const content = <ShoppingCart />;

  const styledCount = (() => {
    switch (status) {
      case "idle":
        return <ClockCircleFilled style={{ color: "orange" }} />;
      case "error":
        return <ExclamationCircleFilled style={{ color: "red" }} />;
      case "loading":
        return <SyncOutlined spin />;
      default:
        return count;
    }
  })();

  const tooltip = (() => {
    switch (status) {
      case "idle":
        return "Opps, the shopping cart has not been synced";
      case "error":
        return "Sorry, we encounter some unknown issues to sync your shopping cart.";
      case "loading":
        return "We are synchronizing your shopping cart.";
      default:
        return "";
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
          <Button type="text" title={tooltip}>
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
