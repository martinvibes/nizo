"use client";
import React, { useState } from "react";
import { UseLangchainAiResponse } from "@/api/langchain";
import Dashboard from "@/components/dashboard/dashboard";
import NavBar from "@/components/dashboard/navbar";
import TokenSwapComponent from "@/components/dashboard/swap";

export default function Home() {
  const [question, setQuestion] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const {
      intent,
      amount,
      sourceToken,
      destinationToken,
      error,
      generalResponse,
    } = await UseLangchainAiResponse(question);

    switch (intent) {
      case "swap":
        // await executeSwap(result);
        if (amount) {
          const lamports = Math.round(amount * 1000000000);
          console.log("this is an intent to swap tokens");
        } else {
          console.error("Amount is undefined");
        }

        break;

      case "checkBalance":
        // Trigger balance check logic
        // await checkTokenBalance(result);
        console.log("this is an intent to check balance");
        break;

      case "normalChat":
        // General conversation response
        // return result.generalResponse;
        console.log("this is an intent for general response");

      case "unknown":
        // Fallback handling
        console.log("omor, him say he no know");
      // return "I'm not sure how to help with that. Could you clarify?";

      default:
        // Catch-all for unexpected intents
        console.log("chiana");
      // return "How can I assist you today?";
    }
  }
  return (
    <div>
      <p>china will be great</p>
      <form onSubmit={handleSubmit} action="">
        <input
          placeholder="wtite am here"
          type="text"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        <button type="submit">run</button>
      </form>
      <TokenSwapComponent />
      <NavBar />
      <Dashboard />
    </div>
  );
}
