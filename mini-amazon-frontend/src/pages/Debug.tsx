export default function Debug() {
  throw new Error("Test error for ErrorBoundary");
  // console.log("Debug page accessed");
  // console.log(data);
  return <div>Debug Page</div>;
}
