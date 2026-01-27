interface FetchCartAPIArgs {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  endpoint?: string;
  body?: { quantity: number };
}

const fetchCartAPI = async (args, { getState }) => {
  const defaultargs = {
    method: "GET",
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
};

export default function Debug() {
  fetchCartAPI(
    {},
    { getState: () => ({ auth: { token: "test-token" } }) },
  ).then((data) => {
    console.log("Debug page accessed");
    console.log(data);
  });
  // throw new Error("Test error for ErrorBoundary");
  // console.log("Debug page accessed");
  // console.log(data);
  return <div>Debug Page</div>;
}
