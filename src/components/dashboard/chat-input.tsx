"use client";
import React, { useState } from "react";
import sendbtn from "./sendbtn.svg";
import Image from "next/image";
import { useMessages } from "@/contexts/store";
import { UseLangchainAiResponse } from "@/api/langchain";
import { useJupiterSwap } from "@/api/jupiter-swap-example";
export const Chatinputdiv = () => {
  const [input, setInput] = useState("");
  // const [inputAmount, setInputAmount] = useState("");
  // const [inputToken, setInputToken] = useState("");
  // const [outputToken, setOutputToken] = useState("");
  const { swap } = useJupiterSwap();
  const { setMessages } = useMessages();
  const handleInputSubmit = async () => {
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
    const airesponse = await UseLangchainAiResponse(input);
    console.log(airesponse);

    // Then add AI's response to messages
    if (airesponse?.generalResponse) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: (prevMessages.length + 1).toString(),
          sender: "agent",
          content: airesponse.generalResponse,
        },
      ]);
    }

    switch (airesponse.intent) {
      case "swap":
        if (
          airesponse.amount ||
          airesponse.sourceToken ||
          airesponse.destinationToken
        ) {
          try {
            // Swap 1 SOL for USDC
            const txid = await swap({
              inputAmount: (airesponse.amount ?? 1) * 1_000_000_000, // 1 SOL (in lamports)
              inputMint: "So11111111111111111111111111111111111111112",
              outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              slippageBps: 50, // 0.5% slippage
            });
            console.log("Swap successful! Transaction ID:", txid);
          } catch (err) {
            console.error("Swap failed:", err);
          }
        }
        break;
      case "checkBalance":
        console.log("Check balance intent detected");
        break;
      case "transfer":
        console.log("Transfer intent detected");
        break;
      case "normalChat":
        console.log("Normal chat intent detected");
        break;
      case "unknown":
        console.log("Unknown intent");
        break;
      default:
        console.log("Unknown intent");
        break;
    }
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
