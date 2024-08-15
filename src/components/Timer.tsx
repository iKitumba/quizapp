"use client";
import * as React from "react";

type TimerProps = {
  setStop: React.Dispatch<React.SetStateAction<boolean>>;
  questionNumber: number;
};

const MAX_SECONDS_AMOUNT = 30;

export const Timer = ({ setStop, questionNumber }: TimerProps) => {
  const [timer, setTimer] = React.useState(MAX_SECONDS_AMOUNT);

  React.useEffect(() => {
    if (timer === 0) {
      return setStop(true);
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [setStop, timer]);

  React.useEffect(() => {
    setTimer(MAX_SECONDS_AMOUNT);
  }, [questionNumber]);

  return timer;
};
