import { ErrorIcon } from "@/components/Icons";
import { Flex } from "antd";

import { GoHomeButton } from "./GoHome";
import { type ErrorCode } from "@/app/types";

interface Props {
  code: ErrorCode;
}
export default function ErrorMessage({ code }: Props) {
  const LOOKUP = {
    AUTH_FAILED: "Authentication failed. Please check your credentials.",
    NETWORK_ERROR: "A network error occurred. Please try again later.",
    NO_PRODUCT: "No products available. Please come back later.",
    NO_PERMISSION: "Sorry, you don't have access to this page",
    UNKOWN: "Unkown issue!",
  } satisfies Record<ErrorCode, string> as Record<ErrorCode, string>;
  const message = LOOKUP[code];

  return (
    <Flex align="center" vertical>
      <ErrorIcon></ErrorIcon>
      <h1>Oops, something went wrong!</h1>
      <h2> {message} </h2>
      <GoHomeButton />
    </Flex>
  );
}
