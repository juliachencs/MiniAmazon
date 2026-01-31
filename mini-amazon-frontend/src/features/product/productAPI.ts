import { api } from "@/app/api";
import type {
  BasicResponse,
  ListProductsQuery,
  Product,
  ProductCreated,
} from "@/app/types";

// result: This is the data returned by a successful query | undefined
export const productAPI = api.injectEndpoints({
  endpoints: (build) => ({
    // the product related queries
    listProducts: build.query<Product[], ListProductsQuery>({
      query: ({ offset, limit, sortby }: ListProductsQuery) => ({
        url: `products?offset=${offset}&limit=${limit}&sortby=${sortby}`,
      }),

      providesTags: (result) => {
        const tags = [{ type: "Product" as const, id: "PARTIAL-LIST" }];
        if (result) {
          return [
            ...tags,
            ...result.map((x) => ({ type: "Product" as const, id: x._id })),
          ];
        }
        return tags;
      },
    }),

    getProduct: build.query<Product, string>({
      query: (id: string) => `products/${id}`,
      providesTags: (result) => {
        return result ? [{ type: "Product", id: result._id }] : [];
      },
    }),

    countProducts: build.query<number, void>({
      query: () => "products/count",
      providesTags: [{ type: "Product", id: "COUNT" }],
    }),

    updateProduct: build.mutation<Product, Product>({
      query: (product: Product) => ({
        url: `products/${product._id}`,
        method: "PUT",
        body: product,
      }),

      invalidatesTags: (result) => {
        return result
          ? [
              { type: "Product", id: "PARTIAL-LIST" },
              { type: "Product", id: result._id },
            ]
          : [];
      },
    }), // end updateProduct endpoint

    deleteProduct: build.mutation<BasicResponse, string>({
      query: (id: string) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (_resutl, _error, args) => {
        return [
          { type: "Product", id: "PARTIAL-LIST" },
          { type: "Product", id: args },
          { type: "Product", id: "COUNT" },
        ];
      },
    }),

    createProduct: build.mutation<Product, ProductCreated>({
      query: (product: ProductCreated) => ({
        url: `products`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: [
        { type: "Product", id: "PARTIAL-LIST" },
        { type: "Product", id: "COUNT" },
      ],
    }), // end createProduct endpoint
  }), // end definition of all endpoints
});

// export Product related auto-generated hooks
export const {
  useListProductsQuery,
  useGetProductQuery,
  useCountProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPI;
