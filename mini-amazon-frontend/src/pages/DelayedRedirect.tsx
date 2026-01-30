import { useEffect, useState } from "react";
import { Progress, Result } from "antd";
import { useNavigate } from "react-router-dom";

// note: this can only be used in route element
export default function DelayedRedirect({
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

  const percent = (timeLeft / timeout) * 100;
  const progress = percent < 1 ? "success" : "active";

  // Re-run effect if timeLeft changes
  useEffect(() => {
    console.log("update");
    // Exit if the countdown is finished
    if (timeLeft < 1) {
      if (redirect === -1) {
        navigate(-1);
      } else {
        navigate(redirect, { replace: true });
      }
      return;
    }
  }, [timeLeft, navigate, redirect]);

  // Setup interval after mounted and clear it after un-mount
  useEffect(() => {
    // Set up the interval after mounted
    console.log("setup");
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime: number) => (prevTime > 1 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      console.log("clear");
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Result
      title={title}
      icon={
        <Progress
          type="circle"
          percent={percent}
          status={progress}
          format={() => `${timeLeft}s`}
        />
      }
      subTitle={`Redirecting you to ${location} in ${timeLeft}`}
    />
  );
}
