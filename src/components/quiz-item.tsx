"use client";
import { Answer, Question } from "@/utils/data";
import { useEffect, useState } from "react";
import "./quizitem.css";

type QuizItemProps = {
  data: Question[];
  setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
  questionNumber: number;
  setStop: React.Dispatch<React.SetStateAction<boolean>>;
};

export const QuizItem = ({
  data,
  setQuestionNumber,
  questionNumber,
  setStop,
}: QuizItemProps) => {
  const [className, setClassName] = useState("answer");
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);

  const delay = (duration: number, callback: () => void) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const handleClick = (a: Answer) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(3000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });
    delay(6000, () => {
      if (a.correct) {
        setQuestionNumber((prev) => (prev === data.length ? 1 : prev + 1));
        setSelectedAnswer(null);
      } else {
        setStop(true);
      }
    });
  };

  return (
    <div className="quizItem">
      <div className="quizQuestion">{question?.question}</div>
      <div className="quizAnswers">
        {question?.answers.map((a) => (
          <div
            key={a.text}
            className={selectedAnswer === a ? className : "answer"}
            onClick={() => handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
};
