import type { UserInfo } from "@/app/types";
import UserForm from "@/components/auth/UserForm";
import NavButton from "@/components/NavButtons";
import { Flex, Modal, Typography } from "antd";
import { useNavigate } from "react-router-dom";

export default function RecoverPassword() {
  const navigate = useNavigate();

  const onRecoverPassowrd = (values: UserInfo) => {
    Modal.confirm({
      title: "Recover password",
      icon: null,
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
          Enter your email to recover your password.
        </Typography.Paragraph>
        <UserForm type="recover" handler={onRecoverPassowrd} />
        <Typography.Text>Remember your password?</Typography.Text>
        <NavButton type="link" to="login">
          Sign in
        </NavButton>
      </Flex>
    </div>
  );
}
