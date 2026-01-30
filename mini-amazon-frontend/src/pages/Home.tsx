import { isGuest } from "@/app/utils";
import { BrowerProductsButton, LoginButton } from "@/components/NavButtons";
import { useRole } from "@/features/auth/authHooks";
import { Result, Space } from "antd";

//https://nicepage.com/landing-page/preview/text-with-two-buttons-726103
export default function Home() {
  const { role } = useRole();

  return (
    <Result
      icon={<></>}
      title="Welcome to mini-amazon"
      subTitle="start your online shopping from"
      className="welcome"
      extra={
        <Space size="middle">
          <BrowerProductsButton type="primary" />
          {isGuest(role) && <LoginButton />}
        </Space>
      }
    ></Result>
  );
}
