import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { useEffect, useState } from "react";

type balance ={
  sol:number,
  usd:number
}
export function useGetBalance() {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<balance>({
    sol:0,
    usd:0
  });
  useEffect(() => {
    if (!publicKey) {
      setBalance({
        sol:0,
        usd:0
      }); // Wallet not connected
      return;
    }

    // Create a connection to the Solana network
    const connection = new Connection(
      process.env.NEXT_PUBLIC_SOL_RPC_URL ||
        "https://mainnet.helius-rpc.com/?api-key=bad30ab6-a17a-421d-ae79-a7bc47f9fea3",
      "confirmed"
    );
    // Function to fetch the SOL price in USD
    const getSolPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const data = await response.json();
        return data.solana.usd;
      } catch (error) {
        console.error("Error fetching SOL price:", error);
        throw error;
      }
    };

    const fetchBalance = async () => {
      try {
        const balance = await connection.getBalance(publicKey);
        // Convert lamports to SOL
        const solBalance = +balance / 1e9;
        // Fetch the current SOL price in USD
        const solPrice = await getSolPrice();

        // Calculate the dollar equivalent
        const usdEquivalent = solBalance * solPrice;

        setBalance({
          sol: solBalance,
          usd:+usdEquivalent.toFixed(3),
        });
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [publicKey]);

  return { balance };
}
