"use client";
import React, { useEffect, useState } from "react";

type TimerProps = {
  setStop: React.Dispatch<React.SetStateAction<boolean>>;
  questionNumber: number;
};

const MAX_SECONDS_AMOUNT = 30;

export const Timer = ({ setStop, questionNumber }: TimerProps) => {
  const [timer, setTimer] = useState(MAX_SECONDS_AMOUNT);

  useEffect(() => {
    if (timer === 0) {
      return setStop(true);
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [setStop, timer]);

  useEffect(() => {
    setTimer(MAX_SECONDS_AMOUNT);
  }, [questionNumber]);

  return timer;
};
