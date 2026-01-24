import React from "react";
import type { ErrorInfo, ReactNode } from "react";
import ErrorMessage from "./ErrorMessage";
import { getErrorProps } from "@/app/utils";
import { GoHomeButton } from "@/components/GoHome";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false } as State;
  }

  // Update state so the next render shows the fallback UI
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  // Log error details to an external service
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error");
    console.error(error);
    console.error(info);
  }

  render() {
    const { issue, suggestion } = getErrorProps({ status: "UNKOWN_ISSUE" });

    if (this.state.hasError) {
      // Custom fallback UI
      return (
        this.props.fallback || (
          <ErrorMessage
            trouble="Unknow system issue!"
            issue={issue}
            suggestion={suggestion}
          >
            <GoHomeButton />
          </ErrorMessage>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
