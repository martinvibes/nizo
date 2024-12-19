import { ChatOpenAI } from "@langchain/openai";
// import {
//   START,
//   END,
//   MessagesAnnotation,
//   StateGraph,
//   MemorySaver,
// } from "@langchain/langgraph";
import { z } from "zod";
// import { v4 as uuidv4 } from "uuid";

export async function UseLangchainAiResponse(question: string) {
  // const config = { configurable: { thread_id: uuidv4() } };

  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
    apiKey: process.env.NEXT_PUBLIC_LANGCHAIN_API_KEY,
  });

  const formatInstructions = `Analyze the user's input and categorize it:
      - If it's a DeFi action (swap, check balance), extract specific parameters
      - For general questions about the platform, use the provided website context
      - Handle various types of inputs flexibly
      - Provide clear, concise, and helpful responses`;

  const generalResponseDesc = ` Examine the feedback provided by the user and craft a response that is easy to understand, addressing their prompt thoughtfully. `;

  const IntentSchema = z.object({
    intent: z
      .enum(["swap", "checkBalance", "transfer", "normalChat", "unknown"])
      .describe(formatInstructions),
    amount: z.number().optional(),
    sourceToken: z.string().optional(),
    destinationToken: z.string().optional(),
    error: z.string().optional(),
    generalResponse: z.string().describe(generalResponseDesc),
  });
  const structuredLlm = model.withStructuredOutput(IntentSchema);
  try {
    // Define the function that calls the model
    // const callModel = async (state: typeof MessagesAnnotation.State) => {
    //   const response = await structuredLlm.invoke(state.messages);
    //   // Update message history with response:
    //   return { messages: response };
    // };

    // Define a new graph
    // const workflow = new StateGraph(MessagesAnnotation)
    //   // Define the (single) node in the graph
    //   .addNode("model", callModel)
    //   .addEdge(START, "model")
    //   .addEdge("model", END);

    // // Add memory
    // const memory = new MemorySaver();
    // const app = workflow.compile({ checkpointer: memory });

    // const output = await app.invoke({ messages: input }, config);
    // const intentResult = await app.invoke({ messages: question }, config);
    // console.log(intentResult.messages[intentResult.messages.length - 1]);
    const intentResult = await structuredLlm.invoke(question);
    return intentResult;
  } catch (error) {
    console.error("Error processing request:", error);
    return {
      intent: "unknown",
      error: "Unable to process your request. Please try again.",
    };
  }
}

// const websiteContext = `
// Website Overview:
// - Purpose: Decentralized Finance (DeFi) Platform
// - Key Features:
//   1. Token Swapping
//   2. Balance Checking
//   3. Token Transfers
//   4. Real-time Market Information

// Supported Actions:
// - Swap tokens between different cryptocurrencies
// - Check wallet balances
// - Transfer tokens between wallets
// - View current market rates and trends

// Technical Capabilities:
// - Secure blockchain-based transactions
// - Multi-chain support
// - Low transaction fees
// - Real-time price tracking
// `;
