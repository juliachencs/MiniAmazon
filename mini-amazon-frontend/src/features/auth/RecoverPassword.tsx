import { Flex, Modal, Typography } from "antd";
import UserForm from "@/features/auth/UserForm";
import { useNavigate } from "react-router-dom";
import type { UserInfo } from "@/app/types";

export default function RecoverPassword() {
  const navigate = useNavigate();

  const onRecoverPassowrd = (values: UserInfo) => {
    Modal.confirm({
      title: "Recover password",
      content: (
        <p>
          A password reset email has been sent to {values.email}. Please check
          your inbox.
        </p>
      ),
      onOk: () => {
        console.log("Confirmed");
        navigate("/login");
      },
      onCancel: () => {
        console.log("Cancelled");
      },
      okText: "Go back to login",
      cancelText: "Return",
    });
  };

  return (
    <div className="auth-card">
      <Flex justify="center" align="center" vertical>
        <Typography.Title level={3}> Recover your password</Typography.Title>
        <Typography.Paragraph>
          Enter your email to recover your password{" "}
        </Typography.Paragraph>
        <UserForm type="recover" handler={onRecoverPassowrd} />
        <Typography.Text>Remember your password?</Typography.Text>{" "}
        <Typography.Link href="/login">Sign in</Typography.Link>{" "}
      </Flex>
    </div>
  );
}
