import { useState } from "react";
import { Typography, Select, Pagination } from "antd";
import ListProducts from "./ListProducts";
import CreateProductBtn from "./CreateProductBtn";
import type { SortType } from "@/app/types";

export default function Products() {
  const [page, setPage] = useState(1);
  const [sortby, setSortby] = useState<SortType>("Last");

  const page_size = 24; // the number of items per page
  const total = 1000; // the total number of items

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
      <></>
      <Typography.Title> Products </Typography.Title>
      <div>
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
      </div>
      <ListProducts offset={offset} limit={limit} sortby={sortby} />
      <Pagination
        defaultCurrent={1}
        current={page}
        pageSize={page_size}
        total={total}
        showSizeChanger={false}
        onChange={handlePageChange}
      />
    </>
  );
}
