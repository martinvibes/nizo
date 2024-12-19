"use client";
import React, { useState } from "react";
import { UseLangchainAiResponse } from "@/api/langchain";
import Dashboard from "@/components/dashboard/dashboard";
import NavBar from "@/components/dashboard/navbar";

export default function Home() {
  const [question, setQuestion] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await UseLangchainAiResponse(question);
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
      <NavBar />
      <Dashboard />
    </div>
  );
}
