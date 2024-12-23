"use client";
import React from "react";
import { Poppins } from "next/font/google";
import { useMessages } from "@/contexts/store";
import Loader from "../ui/Loader";

const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

export const Chatpage = () => {
  const { messages, isLoading } = useMessages();
  // const currentIndex = messages.length - 1;

  // const text = messages[currentIndex]?.content;
  // const character = text?.split("");

  // const [response, setResponse] = useState("");
  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (count < character.length) {
  //       setResponse((prev) => prev + character[count]); // Append the current character
  //       setCount((prev) => prev + 1); // Move to the next character
  //     } else {
  //       clearInterval(interval); // Clear the interval once all characters are processed
  //     }
  //   }, 50);

  //   return () => clearInterval(interval);
  // }, [count, character]);
  return (
    <div
      className={`${poppins.className} text chat-texts h-[720px] w-full mx-auto p-4 rounded-lg space-y-4 flex flex-col-reverse overflow-y-auto scrollbar-hide scroll-smooth relative`}
    >
      {[...messages].reverse().map((message) => (
        <div
          key={message.id}
          className={`flex items-center my-2 ${
            message.sender === "user" ? "justify-end" : ""
          }`}
        >
          <div
            className={`${
              message.sender === "user" ? "bg-[#B6689E]" : "bg-[#645BE2]"
            } px-4 py-3 rounded-[24px] max-w-[70%]`}
          >
            {message.content}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="absolute -bottom-3 mx-auto w-full">
          <Loader />
        </div>
      )}
    </div>
  );
};
