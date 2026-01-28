import type { CartQuery } from "@/app/types";

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface FetchCartAPIArgs<BodyType = unknown> {
  method?: Method;
  endpoint?: string;
  body?: BodyType;
}

async function fetchCartAPI<ResultType>(
  args: FetchCartAPIArgs,
  { getState },
): Promise<ResultType> {
  const defaultargs = {
    method: "GET" as Method,
    endpoint: "",
    body: {},
  };

  args = { ...defaultargs, ...args };

  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const token = getState().auth.token;
  if (token) {
    headers.append("authorization", `Bearer ${token}`);
  }

  const url = "http://localhost:5200/api/cart" + args.endpoint;
  console.log(url);
  console.log(headers);

  try {
    const response = await fetch(url, {
      method: args.method,
      headers: headers,
      body: args.method == "GET" ? undefined : JSON.stringify(args.body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging URL:", error);
  }

  return { error: "Failed to fetch" };
}

function getCart({ getState }) {
  return fetchCartAPI({}, { getState });
}

function addItemToCart(productId: string, { getState }) {
  return fetchCartAPI(
    {
      method: "POST",
      endpoint: `/items`,
      body: { productId },
    },
    { getState },
  );
}

function updateItemQuantity({ productId, quantity }: CartQuery, { getState }) {
  return fetchCartAPI(
    {
      method: "PUT",
      endpoint: `/items/${productId}`,
      body: { quantity },
    },
    { getState },
  );
}

function removeItemFromCart(productId: string, { getState }) {
  return fetchCartAPI(
    {
      method: "DELETE",
      endpoint: `/items/${productId}`,
    },
    { getState },
  );
}

function applyPromotionCode(promoCode: string, { getState }) {
  return fetchCartAPI(
    {
      method: "POST",
      endpoint: `/promo`,
      body: { promoCode },
    },
    { getState },
  );
}

export const cartAPI = {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  applyPromotionCode,
};
