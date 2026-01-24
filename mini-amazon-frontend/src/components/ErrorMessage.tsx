import { Result, Space } from "antd";
import type { ReactNode } from "react";

export interface ErrorMessageCardProps {
  trouble?: string; // what trouble happens
  issue: string; // the issue caused the trouble
  suggestion: string; // the suggestion for  user to do
  children?: ReactNode;
}

export default function ErrorMessageCard({
  trouble,
  issue,
  suggestion,
  children,
}: ErrorMessageCardProps) {
  return (
    <Result
      status="error"
      title="Oops, something went wrong!"
      subTitle={trouble}
      extra={children}
    >
      <p>
        {issue} <Space /> {suggestion} <Space />
        Feel free to contact us via email service@miniamazon.com for more
        support!
      </p>
    </Result>
  );
}
