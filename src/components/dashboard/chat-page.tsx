"use client";
import React from "react";
import { Poppins } from "next/font/google";
import { useMessages } from "@/contexts/store";
import Loader from "../ui/Loader";
import DonutChart from "../ui/chart";

const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

export const Chatpage = () => {
  const { messages, isLoading } = useMessages();
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
            {!message.balance && message.content}
            {message.balance && (
              <DonutChart data={[{ name: "sol", value: 0.001 }]} total={1.5} />
            )}
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
