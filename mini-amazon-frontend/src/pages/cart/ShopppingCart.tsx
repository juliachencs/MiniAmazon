import { useCart, useAppDispatch } from "@/app/hooks";
import type { CartResponse } from "@/app/types";
import { cartThunks } from "@/features/cart/cartthunks";
import { useEffect } from "react";

import {
  Button,
  Card,
  Descriptions,
  type DescriptionsProps,
  Divider,
  Empty,
  Flex,
  Image,
  Row,
  Col,
  Input,
} from "antd";
import AddToCartBtn from "@/pages/products/AddToCartBtn";
import RemoveFromCartBtn from "@/pages/cart/RemoveFromCartBtn";
import { Link } from "react-router";

const descStyles: DescriptionsProps["styles"] = {
  label: {
    fontWeight: "bold",
  },
  content: {
    textAlign: "right",
    fontWeight: "bold",
    display: "block" /* Ensure it's a block element */,
  },
};

function CartEntry({ productId, productName, priceSnapshot, productImgURI }) {
  return (
    <Card>
      <Row align="middle" justify="start" gutter="16px" wrap={false}>
        <Col flex="none">
          <Image width="128px" src={productImgURI} />
        </Col>
        <Col flex="auto">
          <p> {productName} </p>
          <p> {priceSnapshot}</p>
          <Flex justify="space-between" wrap={true}>
            <AddToCartBtn productId={productId}></AddToCartBtn>{" "}
            <RemoveFromCartBtn productId={productId}></RemoveFromCartBtn>
          </Flex>
        </Col>
      </Row>
    </Card>
  );
}

function ShoppintCartForm({
  products,
  subtotal,
  discount,
  total,
}: CartResponse) {
  if (products && products.length === 0) {
    return <Empty description="Your shopping cart is empty." />;
  }

  const items = [
    {
      key: "subtotal",
      label: "Subtotal",
      children: `${subtotal}`,
    },
    {
      key: "discount",
      label: "Discount",
      children: `${discount}`,
    },
    {
      key: "total",
      label: "Total",
      children: `${total}`,
    },
  ];

  const onCheckout = () => {
    console.log("continue to checkout");
  };

  return (
    <Flex vertical>
      {/*products */}
      {products?.map((x) => (
        <CartEntry {...x} />
      ))}
      <Divider />

      <div> Apply Discount Code</div>
      <div>
        <Input />
        <Button type="primary"> Apply Discount </Button>
      </div>

      <Divider />
      <Descriptions column={1} items={items} styles={descStyles} />

      <Button type="primary">
        <Link to="/checkout">Continue to checkout </Link>
      </Button>
    </Flex>
  );
}
export default function ShoppingCart() {
  const { cart } = useCart();
  const { mode } = cart;
  console.log("ShoppingCart render, mode=", mode);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cartThunks.getCart());
  }, [dispatch]);

  if (mode === "error") {
    return <div>Error loading cart. Please try again.</div>;
  }
  if (mode === "uninitialized") {
    return <div>Cart is uninitialized.</div>;
  }

  return (
    <ShoppintCartForm
      style={{ opacity: mode === "loading" ? 0.5 : 1 }}
      {...cart}
    ></ShoppintCartForm>
  );
}
