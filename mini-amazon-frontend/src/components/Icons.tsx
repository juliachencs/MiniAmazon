import Icon from "@ant-design/icons";

import emailSVG from "@/assets/email.svg?react";
import errorSVG from "@/assets/error.svg?react";

const CustomIconComponent = ({ svg }) => (
  <Icon component={svg} style={{ fontSize: "2em", color: "#08c" }} />
);

export function EmailIcon() {
  return <CustomIconComponent svg={emailSVG}></CustomIconComponent>;
}

export function ErrorIcon() {
  return <CustomIconComponent svg={errorSVG}></CustomIconComponent>;
}
