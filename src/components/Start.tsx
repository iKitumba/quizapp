"use client";
import { useRef } from "react";

type StartProps = {
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
};

export const Start = ({ setUserName }: StartProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (inputRef.current?.value) {
      setUserName(inputRef.current.value);
    }
  };

  return (
    <div className="start">
      <input
        type="text"
        placeholder="Type your username"
        className="startInput"
        ref={inputRef}
      />
      <button className="startButton" onClick={handleClick}>
        Start
      </button>
    </div>
  );
};
