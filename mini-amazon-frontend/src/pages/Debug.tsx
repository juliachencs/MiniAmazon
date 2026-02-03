export default function Debug() {
  // catched
  throw new Error("Test error for ErrorBoundary");

  // not ok
  // fetch("http://unknow.com").catch((error) => {
  //   console.log("errors", error);
  //   throw new Error("I am a network error");
  // });

  return <div>Debug Page</div>;
}
