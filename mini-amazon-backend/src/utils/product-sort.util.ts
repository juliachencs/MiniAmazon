import type { SortOrder } from "mongoose";
import { SortType } from "../types/sortType.enum.js";
import { HttpBadRequestError } from "../errors/http.error.js";

export function sortTypeManager(sortByQuery: string): Record<string, SortOrder> {
    const sortBy: SortType =
        Object.values(SortType).includes(sortByQuery as SortType)
            ? (sortByQuery as SortType)
            : SortType.TimeDesc;

    switch (sortBy) {
        case SortType.TimeDesc:
            return { 'createAt': -1 }
        case SortType.PriceAsc:
            return { 'price': 1 }
        case SortType.PriceDesc:
            return { 'price': -1 }
        default:
            throw new HttpBadRequestError('invalid sorting param');
    }
}