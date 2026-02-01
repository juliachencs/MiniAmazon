import type { CartItem } from "@/app/types";
import AddToCartButton from "@/components/AddToCartButton";
import RemoveFromCartButton from "@/components/cart/RemoveFromCartButton";
import { Card, Row, Col, Image, Flex } from "antd";

export default function ShoppingCartEntry({
  productId,
  productName,
  priceSnapshot,
  productImgURI,
}: CartItem) {
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
            <AddToCartButton productId={productId} />
            <RemoveFromCartButton productId={productId}></RemoveFromCartButton>
          </Flex>
        </Col>
      </Row>
    </Card>
  );
}
