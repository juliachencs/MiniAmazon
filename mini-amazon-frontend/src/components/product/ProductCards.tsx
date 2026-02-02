import type { SortType } from "@/app/types";
import ErrorMessage from "@/components/product/ErrorMessage";
import { ProductCard } from "@/components/product/ProductCard";
import { useListProductsQuery } from "@/features/product/productAPI";
import { Flex, Skeleton, Spin } from "antd";

interface ProductCardsProps {
  offset: number;
  limit: number;
  sortby: SortType;
}
export default function ProductCards({
  offset,
  limit,
  sortby,
}: ProductCardsProps) {
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
              style={{ width: "256px" }}
            />
          ))}
        </Flex>
      </Spin>
    );
  }

  // handle errors
  if (isError) {
    console.log("Fetch error:", error);
    const status = "status" in error ? error.status : "UNKOWN_ISSUE";
    return <ErrorMessage task="GET_PRODUCTS" status={status}></ErrorMessage>;
    // return <>Cannot fetch data</>;
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
