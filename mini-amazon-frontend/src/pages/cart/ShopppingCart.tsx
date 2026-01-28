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
  Form,
  Space,
} from "antd";
import AddToCartBtn from "@/pages/products/AddToCartBtn";
import RemoveFromCartBtn from "@/pages/cart/RemoveFromCartBtn";
import { Link } from "react-router";
import { useDispatch } from "react-redux";

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
  promoCode,
}: CartResponse) {
  const dispatch = useAppDispatch();

  if (products && products.length === 0) {
    return <Empty description="Your shopping cart is empty." />;
  }

  const items = [
    {
      key: "subtotal",
      label: "Subtotal",
      children: `$${subtotal.toFixed(2)}`,
    },
    {
      key: "discount",
      label: "Discount",
      children: discount > 0 ? `-$${discount.toFixed(2)}` : "$0.00",
    },
    {
      key: "total",
      label: "Total",
      children: `$${total.toFixed(2)}`,
    },
  ];
  const onApplyCode = (values) => {
    dispatch(cartThunks.applyPromotionCode(values.promoCode));
  };
  return (
    <Flex vertical>
      {/*products */}
      {products?.map((x) => (
        <CartEntry {...x} />
      ))}
      {/*promocode */}

      {/*promocode */}
      <Divider />
      <Form layout="vertical" style={{ width: "100%" }}>
        <Form.Item label="Apply Discount Code">
          <Space.Compact block={true}>
            <Form.Item name="promoCode" style={{ width: "80%" }}>
              <Input placeholder="MAGIC20OFF" />
            </Form.Item>
            <Button type="primary" style={{ width: "20%" }} htmlType="submit">
              Apply
            </Button>
          </Space.Compact>
        </Form.Item>
      </Form>
      {promoCode && <div>Applied: {promoCode}</div>}
      {/*statics */}

      <Descriptions column={1} items={items} styles={descStyles} />

      {/*checkout */}
      <Divider />
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
    console.log("shoppint cart use effect:", mode);
    if (mode === "uninitialized") {
      dispatch(cartThunks.getCart());
    }
  }, [mode]);

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
