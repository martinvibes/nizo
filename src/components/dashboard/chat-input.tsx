"use client";
import React, { useEffect, useState } from "react";
import sendbtn from "./sendbtn.svg";
import Image from "next/image";
import { useMessages } from "@/contexts/store";
import { UseLangchainAiResponse } from "@/api/langchain";
import useTokenSwap from "./swap";
import { useGetBalance } from "@/hook/useGetBalance";
export const Chatinputdiv = () => {
  const { setMessages, setIsLoading, setTransactionType, transactionType } =
    useMessages();
  const { balance } = useGetBalance();
  const [input, setInput] = useState("");
  const { handleSwap } = useTokenSwap(); // , txResult, error, loading
  const [inputAmount, setInputAmount] = useState("");
  const [inputToken, setInputToken] = useState("");
  const [outputToken, setOutputToken] = useState("");

  async function aiResponse(input: string) {
    const airesponse = await UseLangchainAiResponse(input);
    console.log(airesponse);
    // Then add AI's response to messages
    if (airesponse.intent == "checkBalance"){
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: (prevMessages.length + 1).toString(),
          sender: "agent",
          content: balance.toString(),
          balance:true,
        },
      ]);
      setIsLoading(false);
      console.log("Transfer intent detected");
      return
    }
      if (airesponse?.generalResponse) {
        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   {
        //     id: (prevMessages.length + 1).toString(),
        //     sender: "agent",
        //     content: airesponse.generalResponse,
        //   },
        // ]);
        // setIsLoading(false);
      }

    switch (airesponse.intent) {
      case "swap":
        if (
          airesponse.amount ||
          airesponse.sourceToken ||
          airesponse.destinationToken
        ) {
          console.log("this is an intent to swap tokens");
          console.log("Swap intent detected");
          setInputAmount(airesponse.amount ? airesponse.amount.toString() : "");
          setInputToken(
            airesponse.sourceToken ? airesponse.sourceToken.toString() : ""
          );
          setOutputToken(
            airesponse.destinationToken
              ? airesponse.destinationToken.toString()
              : ""
          );
          await handleSwap(inputAmount, inputToken, outputToken);
        }
        break;
      case "checkBalance":
        console.log("Check balance intent detected");
        break;
      case "transfer":
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: (prevMessages.length + 1).toString(),
            sender: "agent",
            content: balance.toString(),
            balance: true,
          },
        ]);
        setIsLoading(false);
        console.log("Transfer intent detected");
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
  }

  useEffect(() => {
    if (transactionType !== "") {
      setIsLoading(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: (prevMessages.length + 1).toString(),
          sender: "user",
          content: transactionType,
          balance: false,
        },
      ]);
      aiResponse(transactionType);
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
        balance:false,
      },
    ]);
    setInput("");

    await aiResponse(input);
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
