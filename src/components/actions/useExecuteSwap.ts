import { UseLangchainAiResponse } from '@/api/langchain';
import React from 'react'
interface propsData {
    intent: string,
    propsamount: number,
    propssourceToken: string,
    propsdestinationToken: string,
}
export const useExecuteSwap = ({intent, propsamount, propssourceToken, propsdestinationToken} : propsData) => {
    
    switch (intent) {
      case "swap":
        // await executeSwap(result);
        if (propsamount) {
          const lamports = Math.round(propsamount * 1000000000);
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
