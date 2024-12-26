"use client";
import React from "react";
import { Poppins } from "next/font/google";
import { useMessages } from "@/contexts/store";
import Loader from "../ui/Loader";
import DonutChart from "../ui/chart";
import SendTransactionForm from "./tranfer";

const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

export const Chatpage = () => {
  const { messages, isLoading, setMessages } = useMessages();
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
            } px-4 py-3 rounded-[24px] break-words overflow-wrap-anywhere lg:max-w-[700px] md:max-w-[500px] max-w-[300px]`}
          >
            {message.sender !== "chart" && (
              <div
                dangerouslySetInnerHTML={{ __html: message.content }}
                className="message-content"
              />
            )}
            {message.sender === "chart" && (
              <DonutChart
                data={[{ name: "sol", value: message.balance.sol }]}
                total={message.balance.usd}
              />
            )}
            {message.sender === "agent" &&
              message.content.includes("transfer") && (
                <SendTransactionForm
                  onSuccess={() => {
                    setMessages((prev) => [
                      ...prev,
                      {
                        id: (prev.length + 1).toString(),
                        sender: "agent",
                        content: "Transfer completed successfully!",
                        balance: { sol: 0, usd: 0 },
                      },
                    ]);
                  }}
                />
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
