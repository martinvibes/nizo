"use client";
import React, { useEffect, useState } from "react";
import sendbtn from "./sendbtn.svg";
import Image from "next/image";
import { useMessages } from "@/contexts/store";
import { UseLangchainAiResponse } from "@/api/langchain";
import { useJupiterSwap } from "@/api/jupiter-swap-example";
import { useGetBalance } from "@/hook/useGetBalance";
import toast from "react-hot-toast";
import { useWallet } from "@solana/wallet-adapter-react";

export const Chatinputdiv = () => {
  const { publicKey } = useWallet();
  const { setMessages, setIsLoading, setTransactionType, transactionType } =
    useMessages();
  const { balance } = useGetBalance();
  const { swap } = useJupiterSwap();
  const [input, setInput] = useState("");

  const handleAiResponse = async (inputText: string) => {
    if (!publicKey) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: (prevMessages.length + 1).toString(),
          sender: "agent",
          content: `Please connect your wallet first...`,
          balance: { sol: 0, usd: 0 },
        },
      ]);
      setIsLoading(false);
      return;
    }

    const airesponse = await UseLangchainAiResponse(inputText);
    setIsLoading(true);

    if (airesponse.intent == "checkBalance") {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: (prevMessages.length + 1).toString(),
          sender: "chart",
          content: "",
          balance: balance,
        },
      ]);
      setIsLoading(false);
      toast.success("successfully check your balance");
      return;
    }
    if (airesponse?.generalResponse) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: (prevMessages.length + 1).toString(),
          sender: "agent",
          content: airesponse.generalResponse,
          balance: {
            sol: 0,
            usd: 0,
          },
        },
      ]);
      setIsLoading(false);
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
              inputAmount: (airesponse.amount ?? 0.0001) * 1_000_000_000, // 1 SOL (in lamports)
              inputMint: "So11111111111111111111111111111111111111112",
              outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              slippageBps: 50, // 0.5% slippage
            });
            console.log("Swap successful! Transaction ID:", txid);
            toast.success("Swap successful!");
          } catch (err) {
            console.error("Swap failed:", err);
          }
        }
        break;
      case "checkBalance":
        console.log("Check balance intent detected");
        break;
      case "transfer":
        // Extract amount and address from the message if provided
        const transferMatch = input.match(/transfer\s+(\d+\.?\d*)\s+SOL\s+to\s+([^\s]+)/i);
        if (transferMatch) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: (prevMessages.length + 2).toString(),
              sender: "chart",
              content: JSON.stringify({
                amount: parseFloat(transferMatch[1]),
                address: transferMatch[2],
                currency: "SOL"
              }),
              balance: { sol: 0, usd: 0 }
            }
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: (prevMessages.length + 1).toString(),
              sender: "agent",
              content: "Please provide amount and address (e.g., 'transfer 1 SOL to address')",
              balance: { sol: 0, usd: 0 }
            }
          ]);
        }
        setIsLoading(false);
        break;
      case "error":
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: (prevMessages.length + 1).toString(),
            sender: "agent",
            content: `Transaction failed: ${airesponse.error}. Please try again or check your wallet balance.`,
            balance: { sol: 0, usd: 0 }
          }
        ]);
        setIsLoading(false);
        break;
      case "normalChat":
        console.log("Normal chat intent detected");
        break;
      case "unknown":
        console.log("Unknown intent");
        break;
      default:
        setIsLoading(false);
        console.log("Unknown intent");
        break;
    }
  };

  useEffect(() => {
    if (transactionType !== "") {
      setIsLoading(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: (prevMessages.length + 1).toString(),
          sender: "user",
          content: transactionType,
          balance: { sol: 0, usd: 0 }
        }
      ]);
      handleAiResponse(transactionType);
    }
    return () => {
      setTransactionType("");
      setIsLoading(false);
    };
  }, [transactionType, setTransactionType, setIsLoading, setMessages, handleAiResponse]);

  const handleInputSubmit = async () => {
    if (input.trim() === "") return;
    setIsLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: (prevMessages.length + 1).toString(),
        sender: "user",
        content: input,
        balance: {
          sol: 0,
          usd: 0,
        },
      },
    ]);
    setInput("");

    await handleAiResponse(input);
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
        className=" italic focus:outline-none focus:border-none bg-inherit"
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
