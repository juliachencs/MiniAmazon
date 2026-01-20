import { Card } from "antd";
import { Link } from "react-router-dom";
import type { Product } from "@/app/types";
import { MakeProductLink } from "@/app/utils";
import AddToCartBtn from "@/features/products/AddToCartBtn";
import EditProductBtn from "@/features/products/AddToCartBtn";

const { Meta } = Card;

export function ProductCard({ id, name, price, imageURI }: Product) {
  return (
    <Card
      hoverable
      style={{ height: 400, width: 256 }}
      cover=<Link to={MakeProductLink(id)}>
        {" "}
        <img style={{ height: 256, width: 256 }} src={imageURI} />{" "}
      </Link>
    >
      <Meta title={name} description={price} />
      <AddToCartBtn /> <EditProductBtn />
    </Card>
  );
}
