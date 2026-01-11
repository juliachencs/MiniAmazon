import { Modal, message, Flex, Typography } from "antd";

import UserForm from "../components/UserForm";
import { useState } from "react";
import type { UserInfo } from "../types";
import { Link } from "react-router-dom";

export default function RecoverPassword() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onRecoverPassowrd = (values: UserInfo) => {
    setUserEmail(values.email);
    showModal();
  };

  return (
    <>
      <Flex justify="center" align="center" vertical>
        <Typography.Title level={3}> Recover your password</Typography.Title>
        <Typography.Paragraph>
          {" "}
          Enter your email to recover your password{" "}
        </Typography.Paragraph>
        <UserForm
          buttonText="Update Password"
          handler={onRecoverPassowrd}
          hidden={true}
        />
        <Typography.Text>Remember your password?</Typography.Text>{" "}
        <Typography.Link href="/login">Sign in</Typography.Link>{" "}
      </Flex>

      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={<Link to="/login">Sign in</Link>}
        cancelText="Return"
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <p>
          A password reset email has been sent to {userEmail}. Please check your
          inbox.
        </p>
      </Modal>
    </>
  );
}
