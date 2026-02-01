import type { CartQuery, CartResponse } from "@/app/types";
import type { ThunkAPI } from "@/app/hooks";

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface FetchCartAPIArgs<BodyType = unknown> {
  method?: Method;
  endpoint?: string;
  body?: BodyType;
}

async function fetchCartAPI(
  args: FetchCartAPIArgs,
  { getState, rejectWithValue }: ThunkAPI,
) {
  const defaultargs = {
    method: "GET" as Method,
    endpoint: "",
    body: {},
  };
  const base_url = "http://localhost:5200/api/cart";

  args = { ...defaultargs, ...args };

  // prepare headers
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const token = getState().auth.token;
  if (token) {
    headers.append("authorization", `Bearer ${token}`);
  }

  const url = base_url + args.endpoint;
  try {
    const response = await fetch(url, {
      method: args.method,
      headers: headers,
      body: args.method == "GET" ? undefined : JSON.stringify(args.body),
    });

    if (response.ok) {
      const data = await response.json();
      return data.data as CartResponse;
    } else {
      return rejectWithValue({ status: response.status });
    }
  } catch (error) {
    console.log("fetch cart error::", error);
  }

  return rejectWithValue({ status: "UNKONW_ISSUE" });
}

function getCart(api: ThunkAPI) {
  return fetchCartAPI({}, api);
}

function addItemToCart(productId: string, api: ThunkAPI) {
  return fetchCartAPI(
    {
      method: "POST",
      endpoint: `/items`,
      body: { productId },
    },
    api,
  );
}

function updateItemQuantity({ productId, quantity }: CartQuery, api: ThunkAPI) {
  return fetchCartAPI(
    {
      method: "PUT",
      endpoint: `/items/${productId}`,
      body: { quantity },
    },
    api,
  );
}

function removeItemFromCart(productId: string, api: ThunkAPI) {
  return fetchCartAPI(
    {
      method: "DELETE",
      endpoint: `/items/${productId}`,
    },
    api,
  );
}

function applyPromotionCode(promoCode: string, api: ThunkAPI) {
  return fetchCartAPI(
    {
      method: "POST",
      endpoint: `/promo`,
      body: { promoCode },
    },
    api,
  );
}

export const cartAPI = {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  applyPromotionCode,
};
