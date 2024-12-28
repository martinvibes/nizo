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
  const {
    setMessages,
    setIsLoading,
    setTransactionType,
    transactionType,
    setFormData,
  } = useMessages();
  const { balance } = useGetBalance();
  const { swap } = useJupiterSwap();
  const [input, setInput] = useState("");

  const handleAiResponse = async (inputText: string) => {
    setIsLoading(true);
    if (!publicKey) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: (prevMessages.length + 1).toString(),
          sender: "agent",
          content: `Please connect your wallet first...`,
          balance: { sol: 0, usd: 0 },
          intent:"",
        },
      ]);
      setIsLoading(false);
      return;
    }

    const airesponse = await UseLangchainAiResponse(inputText);

    if (airesponse.intent === "checkBalance") {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: (prevMessages.length + 1).toString(),
          sender: "chart",
          content: "",
          balance: balance,
          intent: "",
        },
      ]);
      setIsLoading(false);
      return;
    }
    if (airesponse.intent === "check pricefeeds") {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: (prevMessages.length + 1).toString(),
          sender: "agent",
          content: `Click <a href="/price-feeds" class="text-[#cf209b] hover:text-purple-400 text-lg font-semibold underline">here</a> to check real-time prices for various tokens including SOL, USDC, and other major cryptocurrencies in our price feeds section.`,
          balance: { sol: 0, usd: 0 },
          intent: "",
        },
      ]);
      setIsLoading(false);
      return; // Exit early for price feeds
    }

    if (airesponse?.generalResponse) {
      if(airesponse.intent === "transfer" && airesponse.recipientAddress && airesponse.amount){
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
            intent: airesponse.intent,
          },
        ]);
        setIsLoading(false);
      }
      else{
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
            intent: "",
          },
        ]);
        setIsLoading(false);
      }
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
            toast.error("Swap failed plrase try again");
          }
        }
        break;
      case "checkBalance":
        break;
      case "transfer":
        // Extract amount and address from the message if provided
        // const transferMatch = input.match(
        //    /transfer\s+(\d+\.?\d*)\s+SOL\s+to\s+([^\s]+)/i
        //  ) ?? "";
        // if (transferMatch !== null) {
        setFormData({
          amount: airesponse.amount ?? 0,
          address: airesponse.recipientAddress ?? "",
          currency: "sol",
        });
        // }
        setIsLoading(false);
        break;
      case "error":
        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   {
        //     id: (prevMessages.length + 1).toString(),
        //     sender: "agent",
        //     content: `Transaction failed: ${airesponse.error}. Please try again or check your wallet balance.`,
        //     balance: { sol: 0, usd: 0 }
        //   }
        // ]);
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
          balance: { sol: 0, usd: 0 },
          intent:"",
        },
      ]);
      handleAiResponse(transactionType);
    }
    return () => {
      setTransactionType("");
      setIsLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionType, setTransactionType, setIsLoading, setMessages]);

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
        intent:""
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
