import { Alert, Flex, Modal, Skeleton, Spin } from "antd";
import { ProductCard } from "@/pages/products/ProductCard";
import type { SortType, Product } from "@/app/types";
import { useListProductsQuery } from "@/app/api";
import { getErrorProps } from "@/app/utils";
import ErrorMessage from "@/components/ErrorMessage";

export interface ListProductsProps {
  offset: number;
  limit: number;
  sortby: SortType;
}

export default function ListProducts({
  offset,
  limit,
  sortby,
}: ListProductsProps) {
  const { data, currentData, isLoading, isFetching, isError, error } =
    useListProductsQuery({
      offset,
      limit,
      sortby,
    });

  // the prefix for key prop
  const prefix = "list-products";

  // the first query products from the server
  if (isLoading) {
    console.log("loading products");

    return (
      <Spin tip="Loading" size="large">
        <Flex wrap gap="small">
          {[...Array(limit)].map((_, i) => (
            <Skeleton.Node
              key={`${prefix}-skeleton-${i}`}
              active={true}
              style={{ width: 160 }}
            />
          ))}
        </Flex>
      </Spin>
    );
  }

  // handle errors
  if (isError) {
    console.log("Fetch error:", error);
    const { issue, suggestion } = getErrorProps(error);

    return (
      <ErrorMessage
        trouble={"Sorry, we fail to fetch product information from the server"}
        issue={issue}
        suggestion={suggestion}
      />
    );
  }

  // Data is "stale" because we are fetching a NEW page that isn't cached yet
  // To correct
  const isDataStale = data && !currentData;

  return (
    <div
      className="product-cards"
      style={{
        opacity: isFetching ? 0.5 : 1,
        transition: "opacity 0.2s",
        filter: isDataStale ? "grayscale(50%)" : "none",
      }}
    >
      {isFetching && <Spin size="small" />}
      {!currentData && isFetching}
      {data?.map((x) => (
        <ProductCard key={`card-${x._id}`} {...x}></ProductCard>
      ))}
    </div>
  );
}
