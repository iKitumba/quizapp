"use client";
import { useRef } from "react";

const Start = ({ setUserName }) => {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value && setUserName(inputRef.current.value);
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

export default Start;
