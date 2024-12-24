import { useState, useCallback } from "react";
import { useJupiterSwap } from "@/api/jupiter-swap-example";
import { useWallet } from "@solana/wallet-adapter-react";

const useTokenSwap = (
  inputAmount: string,
  inputToken: string,
  outputToken: string
) => {
  const [txResult, setTxResult] = useState("");
  const { connected } = useWallet();
  const { swap, error, loading } = useJupiterSwap(
  );

  const handleSwap = useCallback(async () => {
    console.log("inputAmount:", inputAmount);
    console.log("inputToken:", inputToken);
    console.log("outputToken:", outputToken);
    try {
      if (!connected) {
        setTxResult("Please connect your wallet first");
        return;
      }

      // Validate input amount
      const amount = parseFloat(inputAmount);
      if (isNaN(amount) || amount <= 0) {
        setTxResult("Please enter a valid amount");
        return;
      }

      // Convert input amount to lamports (multiply by 10^9 for SOL)
      const lamports = Math.round(amount * 1000000000);

      console.log("Swapping with params:", {
        inputAmount: lamports,
        inputMint: inputToken,
        outputMint: outputToken,
      });

      const txid = await swap({
        inputAmount: lamports,
        inputMint: inputToken,
        outputMint: outputToken,
        slippageBps: 50,
      });

      setTxResult(
        `Swap successful! Transaction: https://explorer.solana.com/tx/${txid}`
      );
    } catch (err) {
      setTxResult(`Swap failed: ${(err as Error).message}`);
    }
  }, [inputAmount, inputToken, outputToken, connected, swap]);

  return { handleSwap, txResult, error, loading };
};

export default useTokenSwap;
