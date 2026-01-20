import type { SortOrder } from "mongoose";
import { HttpBadRequestError } from "../errors/bad-request-error.js";
import { SortType } from "../types/sortType.enum.js";

export function sortTypeManager(sortByQuery: string): Record<string, SortOrder> {
    const sortBy: SortType =
        Object.values(SortType).includes(sortByQuery as SortType)
            ? (sortByQuery as SortType)
            : SortType.TIMEDESC;

    switch (sortBy) {
        case SortType.TIMEDESC:
            return { 'createAt': -1 }
        case SortType.PRICEASC:
            return { 'price': 1 }
        case SortType.PRICEASC:
            return { 'price': -1 }
        default:
            throw new HttpBadRequestError('invalid sorting param');
    }
}