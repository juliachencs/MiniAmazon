import { useState } from "react";
import { Typography, Select, Pagination, Flex } from "antd";

import type { SortType } from "@/app/types";
import { useRole } from "@/app/hooks";
import { useCountProductsQuery } from "@/app/api";

import ListProducts from "@/pages/products/ListProducts";
import CreateProductBtn from "@/pages/products/CreateProductBtn";

export default function Products() {
  const { role } = useRole();
  console.log(role);

  const [page, setPage] = useState(1);
  const [sortby, setSortby] = useState<SortType>("Last");
  const { data: num_products, isError: isGetCountError } =
    useCountProductsQuery();

  const page_size = 10; // the number of items per page
  let total = 200; // the total number of items
  if (!isGetCountError && num_products) {
    console.log("the toatal number of products:", num_products);
    total = num_products;
  }

  const handlePageChange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
    setPage(page);
  };

  const handleSortbyChange = (value: SortType) => {
    setSortby(value);
    setPage(1);
  };

  const offset = page_size * (page - 1);
  const limit = page_size;

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        vertical
        className="products-container"
      >
        <section className="products-header">
          <Typography.Title> Products </Typography.Title>

          <Select
            defaultValue="Last"
            value={sortby}
            onChange={handleSortbyChange}
            options={[
              { value: "Last", label: "Last added" },
              { value: "PriceAsc", label: "Price: low to high" },
              { value: "PriceDes", label: "Price: high to low" },
            ]}
          />
          <CreateProductBtn />
        </section>

        <div className="products-main">
          <ListProducts offset={offset} limit={limit} sortby={sortby} />
        </div>

        <section className="products-footer">
          <Pagination
            defaultCurrent={1}
            current={page}
            pageSize={page_size}
            total={total}
            showSizeChanger={false}
            onChange={handlePageChange}
          />
        </section>
      </Flex>
    </>
  );
}
