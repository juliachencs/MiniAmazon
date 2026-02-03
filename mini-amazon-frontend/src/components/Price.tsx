import { Badge, Descriptions } from "antd";

interface PriceProps {
  price: number;
  badge?: boolean;
}
export default function Price({ price, badge = false }: PriceProps) {
  return (
    <Descriptions>
      <Descriptions.Item
        label={badge ? <Badge text="Price" color="red" /> : "Price"}
      >
        ${price}
      </Descriptions.Item>
    </Descriptions>
  );
}
