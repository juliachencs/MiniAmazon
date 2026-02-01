import type { SortType } from "@/app/types";
import { Flex } from "antd";

interface ListProductsProps {
  offset: number;
  limit: number;
  sortby: SortType;
}
export default function ListProducts({
  offset,
  limit,
  sortby,
}: ListProductsProps) {
  return (
    <>
      <Flex>
        {offset}
        {limit}
        {sortby}
      </Flex>
    </>
  );
}
