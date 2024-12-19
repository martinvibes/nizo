"use client";
import React, { useState } from "react";
import { useLangchainAiResponse } from "@/api/langchain";

export default function Home() {
  const [question, setQuestion] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    const response = await useLangchainAiResponse(question);
    console.log(response);
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
    </div>
  );
}
