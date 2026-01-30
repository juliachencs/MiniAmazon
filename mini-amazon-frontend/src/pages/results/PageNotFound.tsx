import { GoHomeButton } from "@/components/HomeBtn";
import { Result } from "antd";

export default function PageNotFound() {
  const subtitle =
    "Sorry, the page you are looking for might have been removed or moved to another URL.";

  return (
    <Result
      status={404}
      title="Oops! Page Not Found"
      subTitle={subtitle}
      extra={<GoHomeButton />}
    />
  );
}
