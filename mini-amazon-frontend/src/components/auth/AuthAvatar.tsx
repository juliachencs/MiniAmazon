import LinkButton from "@/components/LinkButton";
import { UserOutlined } from "@ant-design/icons";

export default function AuthAvatar() {
  return (
    <LinkButton icon={<UserOutlined />} type="text" to="/login">
      Sign in
    </LinkButton>
  );
}
