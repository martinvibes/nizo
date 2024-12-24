import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function useGetBalance() {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    if (!publicKey) {
      setBalance(0); // Wallet not connected
      return;
    }

    // Create a connection to the Solana mainnet
    const connection = new Connection(clusterApiUrl("mainnet-beta"));

    const fetchBalance = async () => {
      try {
        const balance = await connection.getAccountInfo(publicKey);
        console.log(balance);
        //setBalance(balance / 1e9); // Convert lamports to SOL
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [publicKey]);

  return { balance };
}