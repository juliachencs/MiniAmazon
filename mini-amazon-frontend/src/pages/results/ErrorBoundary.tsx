import React from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Result, Button } from "antd";

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
    if (this.state.hasError) {
      const result = (
        <Result
          status="error"
          title="Opps, something went wrong."
          subTitle="We are running into some unknown system issues. Please try again later."
          extra={
            <Button type="primary" href="/">
              Home
            </Button>
          }
        />
      );
      // Custom fallback UI
      return this.props.fallback || result;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
