import type {
  ProductEditQueryTask,
  QueryErrorCode,
  QueryErrorDetails,
} from "@/errors/types";
import { QueryError } from "@/errors/QueryError";
import { getErrorDetail } from "@/errors/utils";

export default class ProductEditQueryError extends QueryError {
  constructor(task: ProductEditQueryTask, code: QueryErrorCode) {
    const issues: Record<ProductEditQueryTask, string> = {
      CREATE_PRODUCT: "Fail to create a product!",
      UPDATE_PRODUCT: "Fail to update the product information!",
      DELETE_PRODUCT: "Fail to delete the product from our database!",
    };

    const issue = issues[task];

    const details: Record<QueryErrorCode, QueryErrorDetails> = {
      404: {
        cause: "The product doesn't exist.",
        message: "Please check the url is correct!",
        actions: ["REFRESH", "BACK"],
      },
    };

    const { cause, message, actions } = getErrorDetail(code, details);

    super(code, issue, cause, message, actions);
  }
}
