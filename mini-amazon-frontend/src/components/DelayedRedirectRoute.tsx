import { useEffect, useState } from "react";
import { Progress, Result } from "antd";
import { useNavigate } from "react-router-dom";

// note: this can only be used in route element
export default function DelayedRedirectRoute({
  title,
  timeout = 5,
  redirect = -1,
}: {
  title: string;
  timeout?: number;
  redirect?: string | -1;
}) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(Math.ceil(timeout));
  const location =
    redirect === -1
      ? "the previous page"
      : redirect === "/"
        ? "the home page"
        : redirect;
  useEffect(() => {
    // Exit if the countdown is finished
    if (timeLeft < 1) {
      if (redirect === -1) {
        navigate(-1);
      } else {
        navigate(redirect, { replace: true });
      }
      return;
    }

    // Set up the interval
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime: number) => (prevTime > 1 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    // or when timeLeft changes and the effect runs again.
    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeft, navigate, redirect]); // Re-run effect if timeLeft changes

  const percent = (timeLeft / timeout) * 100;
  const status = percent < 1 ? "success" : "active";

  // essage.warning(info, 3);
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(-1);
    }, 5000);

    return () => clearTimeout(timer);
  });

  return (
    <Result
      title={title}
      icon={
        <Progress
          type="circle"
          percent={percent}
          status={status}
          format={() => `${timeLeft}s`}
        />
      }
      subTitle={`Redirecting you to ${location} in ${timeLeft}`}
    />
  );
}
