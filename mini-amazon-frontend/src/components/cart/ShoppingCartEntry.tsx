import type { CartItem } from "@/app/types";
import AddToCartButton from "@/components/AddToCartButton";
import RemoveFromCartButton from "@/components/cart/RemoveFromCartButton";
import { Card, Row, Col, Image, Flex, Badge, Typography, Tooltip } from "antd";

// export interface CartItem {
//   productId: string;
//   productName: string;
//   productImgURI: string;
//   quantity: number;
//   inStockQuant: number;
//   priceSnapshot: number;
//   recentChangedPrice: boolean;
//   recentChangedStock: boolean;
//   available: boolean;
//   _id: string;
// }

export default function ShoppingCartEntry({
  productId,
  productName,
  priceSnapshot,
  productImgURI,
  recentChangedPrice,
  recentChangedStock,
  available,
  _id,
}: CartItem) {
  const item = (
    <Card>
      <Row align="middle" justify="start" gutter="16px" wrap={false}>
        <Col flex="none">
          <Image width="128px" src={productImgURI} />
        </Col>
        <Col flex="auto">
          <Typography.Paragraph strong={available} disabled={!available}>
            {productName}{" "}
          </Typography.Paragraph>

          <Tooltip title={recentChangedPrice ? "price updated recently" : ""}>
            <Typography.Paragraph
              type={recentChangedPrice ? "danger" : undefined}
            >
              {priceSnapshot}
            </Typography.Paragraph>
          </Tooltip>

          <Flex justify="space-between" wrap={true}>
            <Tooltip title={recentChangedStock ? "stock updated recently" : ""}>
              {available && <AddToCartButton productId={productId} />}
            </Tooltip>

            <RemoveFromCartButton
              productId={productId}
              _id={_id}
            ></RemoveFromCartButton>
          </Flex>
        </Col>
      </Row>
    </Card>
  );
  return available ? (
    <> {item} </>
  ) : (
    <Badge.Ribbon text="Unavaliable" color="pink">
      {item}
    </Badge.Ribbon>
  );
}
