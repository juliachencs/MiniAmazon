import { useAppDispatch } from "@/app/hooks";
import type { CartResponse } from "@/app/types";
import ShoppingCartEntry from "@/components/cart/ShoppingCartEntry";
import NavButton from "@/components/NavButtons";
import { cartThunks } from "@/features/cart/cartThunks";
import {
  Button,
  Descriptions,
  Divider,
  Empty,
  Flex,
  Form,
  Input,
  Space,
  type DescriptionsProps,
} from "antd";
import { useState } from "react";

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

function PromoCodeForm() {
  const dispatch = useAppDispatch();
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState("");
  const onApplyCode = (values: { promoCode: string }) => {
    console.log(values);
    dispatch(cartThunks.applyPromotionCode(values.promoCode))
      .unwrap()
      .then(() => setError(""))
      .catch(() => setError("Invalid Promocode"));
  };
  const onChange = (value: string) => {
    setDisable(value.length < 6);
  };
  return (
    <Form<{ promoCode: string }>
      layout="vertical"
      onFinish={onApplyCode}
      style={{ width: "100%" }}
    >
      <Form.Item label="Apply Discount Code">
        <Space.Compact block={true}>
          <Form.Item name="promoCode" style={{ width: "80%" }}>
            <Input
              placeholder="MAGIC20OFF"
              onChange={(e) => onChange(e.target.value)}
            />
          </Form.Item>
          <Button
            type="primary"
            disabled={disable}
            style={{ width: "20%" }}
            htmlType="submit"
          >
            Apply
          </Button>
        </Space.Compact>
      </Form.Item>
      <div>{error}</div>
    </Form>
  );
}
export default function ShoppingCartForm({
  products,
  subTotal,
  discount,
  total,
  promoCode,
}: CartResponse) {
  if (products && products.length === 0) {
    return <Empty description="Your shopping cart is empty." />;
  }

  const items = [
    {
      key: "subtotal",
      label: "Subtotal",
      children: `$${subTotal.toFixed(2)}`,
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

  return (
    <Flex vertical>
      {/*products */}
      {products?.map((x) => (
        <ShoppingCartEntry key={x.productId} {...x} />
      ))}
      {/*promocode */}
      <Divider />

      <PromoCodeForm />
      {promoCode && <div>Applied: {promoCode}</div>}
      {/*statics */}

      <Descriptions column={1} items={items} styles={descStyles} />

      {/*checkout */}
      <Divider />
      <NavButton type="primary" to="/checkout">
        Continue to checkout
      </NavButton>
    </Flex>
  );
}
