import type { CartItem } from "@/app/types";
import AddToCartButton from "@/components/AddToCartButton";
import RemoveFromCartButton from "@/components/cart/RemoveFromCartButton";
import NavButton from "@/components/NavButtons";
import Price from "@/components/Price";
import { InfoOutlined } from "@ant-design/icons";
import { Card, Row, Col, Image, Flex, Badge, Typography, Tooltip } from "antd";

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
            {available && [
              <NavButton
                icon=<InfoOutlined />
                shape="circle"
                size="small"
                to={`/products/item/${productId}`}
              />,
            ]}
          </Typography.Paragraph>

          <Price price={priceSnapshot} badge={recentChangedPrice} />

          <Flex justify="space-between" wrap={true}>
            <Tooltip title={recentChangedStock ? "stock updated recently" : ""}>
              {available && <AddToCartButton productId={productId} />}
            </Tooltip>

            <RemoveFromCartButton _id={_id}></RemoveFromCartButton>
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
