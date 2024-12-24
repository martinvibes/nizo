import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function useGetBalance() {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number|null>(null);
  useEffect(() => {
    if (!publicKey) {
      setBalance(null); // Wallet not connected
      return;
    }

    // Create a connection to the Solana network
    const connection = new Connection("","confirmed");

    const fetchBalance = async () => {
      try {
        const balance = await connection.getBalance(publicKey);
        // set to 3 decimal place
        const balanceDecimal = +balance/1e9
        setBalance(balanceDecimal); // Convert lamports to SOL
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [publicKey]);

  return {balance};
}
