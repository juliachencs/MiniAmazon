import { Flex } from "antd";
import { ProductCard } from "@/features/products/ProductCard";
import { type Product } from "@/app/types";

export interface ListProductsProps {
  products: Product[];
}

export default function ListProducts({ products }: ListProductsProps) {
  return (
    <Flex wrap gap="small">
      {products.map((x) => (
        <ProductCard key={`card-${x.id}`} {...x}></ProductCard>
      ))}
    </Flex>
  );
}
