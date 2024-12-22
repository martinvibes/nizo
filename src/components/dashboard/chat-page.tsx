"use client";
import React from "react";
import { Poppins } from "next/font/google";
import { useMessages } from "@/contexts/store";

const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

export const Chatpage = () => {
  const { messages } = useMessages();
  return (
    <div
      className={`${poppins.className} text chat-texts h-[720px] w-full mx-auto p-4 rounded-lg space-y-4 flex flex-col-reverse overflow-y-auto scrollbar-hide scroll-smooth`}
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
    </div>
  );
};
