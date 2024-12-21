"use client";
import React, { useState } from "react";
import sendbtn from "./sendbtn.svg";
import Image from "next/image";
import { useMessages } from "@/contexts/store";
export const Chatinputdiv = () => {
  const { setMessages } = useMessages();
  const [input, setInput] = useState("");

  const handleInputSubmit = () => {
    if (input.trim() === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: (prevMessages.length + 1).toString(),
        sender: "user",
        content: input,
      },
    ]);
    setInput("");
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleInputSubmit();
    }
  };
  return (
    <div
      className="border-2 rounded-[48px] h-16 grid grid-cols-2 gap-4 px-4 py-3"
      style={{ gridTemplateColumns: "90% 10%" }}
    >
      <input
        onKeyDown={handleEnterKey}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message here"
        className=" italic focus:outline-none focus:border-none"
        type="text"
      />
      <button
        onClick={handleInputSubmit}
        className=" flex items-center justify-center"
      >
        <Image
          width="35"
          height="35"
          src={sendbtn.src}
          className=" rounded-full"
          alt="send btn"
        />
      </button>
    </div>
  );
};
