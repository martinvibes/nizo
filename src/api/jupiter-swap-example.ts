import { useState } from 'react';
import { Connection, VersionedTransaction } from "@solana/web3.js";
import { useWallet } from '@solana/wallet-adapter-react';

interface SwapParams {
  inputAmount: number;
  inputMint: string;
  outputMint: string;
  slippageBps?: number;
}

interface UseJupiterSwapReturn {
  swap: (params: SwapParams) => Promise<string>;
  error: string | null;
  loading: boolean;
}

// Using Helius or GenesysGo RPC endpoints as they're more reliable
// You should replace this with your own RPC endpoint from a provider
export const useJupiterSwap = (): UseJupiterSwapReturn => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { publicKey, signTransaction, connected } = useWallet();

  const tryConnect = async () => {
    if (!process.env.NEXT_PUBLIC_SOL_RPC_URL) {
      throw new Error("RPC URL not configured in environment variables");
    }
    return new Connection(process.env.NEXT_PUBLIC_SOL_RPC_URL, 'confirmed');
  };

  const swap = async ({
    inputAmount,
    inputMint,
    outputMint,
    slippageBps = 50
  }: SwapParams): Promise<string> => {
    try {
      if (!connected || !publicKey || !signTransaction) {
        throw new Error("Please connect your wallet first");
      }

      setLoading(true);
      setError(null);

      // Get a working RPC connection
      const connection = await tryConnect();

      // Clean and validate the mint addresses
      const cleanInputMint = inputMint.trim();
      const cleanOutputMint = outputMint.trim();

      // Construct the quote URL properly
      const quoteParams = new URLSearchParams({
        inputMint: cleanInputMint,
        outputMint: cleanOutputMint,
        amount: inputAmount.toString(),
        slippageBps: slippageBps.toString()
      });
      
      const quoteUrl = `https://quote-api.jup.ag/v6/quote?${quoteParams.toString()}`;

      const quoteResponse = await (await fetch(quoteUrl)).json();

      if (quoteResponse.error) {
        throw new Error(quoteResponse.error);
      }

      // Get swap transaction
      const swapResponse = await fetch("https://quote-api.jup.ag/v6/swap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteResponse,
          userPublicKey: publicKey.toString(),
          wrapAndUnwrapSol: true,
        }),
      });

      const swapData = await swapResponse.json();

      if (!swapData.swapTransaction) {
        throw new Error("Failed to get swap transaction");
      }

      // Deserialize and sign transaction
      const swapTransactionBuf = Buffer.from(swapData.swapTransaction, "base64");
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      
      // Sign using the wallet adapter
      const signedTransaction = await signTransaction(transaction);

      // Execute transaction with retry logic
      const txid = await connection.sendRawTransaction(signedTransaction.serialize(), {
        skipPreflight: true,
        maxRetries: 3,
      });

      // Wait for confirmation
      const confirmation = await connection.confirmTransaction(
        txid,
        'confirmed'
      );

      if (confirmation.value.err) {
        throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`);
      }

      return txid;

    } catch (err) {
      let errorMessage = 'An error occurred during swap';
      if (err instanceof Error) {
        if (err.message.includes('403')) {
          errorMessage = 'RPC connection error. Please try again.';
        } else {
          errorMessage = err.message;
        }
      }
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { swap, error, loading };
};

// // Example usage of Jupiter Swap
// const ExampleSwap = () => {
//   const { swap, error, loading } = useJupiterSwap();

//   const handleSwap = async () => {
//     try {
//       // Swap 1 SOL for USDC
//       const txid = await swap({
//         inputAmount: 1_000_000_000, // 1 SOL (in lamports)
//         inputMint: "So11111111111111111111111111111111111111112", // SOL mint address
//         outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC mint address
//         slippageBps: 50, // 0.5% slippage
//       });
//       console.log("Swap successful! Transaction ID:", txid);
//     } catch (err) {
//       console.error("Swap failed:", err);
//     }
//   };

//   return (
//     <button onClick={handleSwap} disabled={loading}>
//       {loading ? "Swapping..." : "Swap SOL to USDC"}
//     </button>
//   );
// };