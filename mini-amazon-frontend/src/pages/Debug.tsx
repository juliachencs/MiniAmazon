import { Button } from "antd";
import { useState } from "react";
import DelayedRedirect from "@/pages/DelayedRedirect";

export default function Debug() {
  // catched
  // throw new Error("Test error for ErrorBoundary");

  const onClick = () => {
    // this error will not be captured by the error boundary
    throw new Error("I am an error from a event  handler");
  };

  // not ok
  fetch("http://unknow.com").catch((error) => {
    console.log("errors", error);
    throw new Error("I am a network error");
  });

  return (
    <div>
      Debug Page
      <Button onClick={() => onClick()}>Throw an error!</Button>
      <DelayedRedirect
        title="Sorry, you need to log in to access that page"
        redirect="/login"
      ></DelayedRedirect>
    </div>
  );
}
