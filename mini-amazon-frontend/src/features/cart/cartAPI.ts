import type { CartResponse } from "@/app/types";
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

  return rejectWithValue({ status: "UNKOWN_ISSUE" });
}

function getCart(api: ThunkAPI) {
  console.log("Query Cart........");
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

function updateItemQuantity(_id: string, quantity: number, api: ThunkAPI) {
  return fetchCartAPI(
    {
      method: "PUT",
      endpoint: `/items/${_id}`,
      body: { quantity },
    },
    api,
  );
}

function removeItemFromCart(_id: string, api: ThunkAPI) {
  return fetchCartAPI(
    {
      method: "DELETE",
      endpoint: `/items/${_id}`,
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
