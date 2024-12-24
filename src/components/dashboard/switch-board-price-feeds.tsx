"use client";

import { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { Card, CardContent } from "@/components/ui/card";
import {
  PRICE_FEEDS,
  SWITCHBOARD_PROGRAM_ID,
} from "@/config/switchboard-feeds";
import { SwitchboardFeed } from "@/config/types/switchboard";
import toast from "react-hot-toast";

interface PriceData {
  [key: string]: {
    price: string | null;
    loading: boolean;
    lastUpdated: string;
  };
}

const SwitchboardPriceFeed = () => {
  const [prices, setPrices] = useState<PriceData>({});
  const [loading, setLoading] = useState(true);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const switchboardProgramId = new PublicKey(SWITCHBOARD_PROGRAM_ID);

  const fetchPrice = async (symbol: string) => {
    try {
      setPrices((prev) => ({
        ...prev,
        [symbol]: { ...prev[symbol], loading: true },
      }));

      const response = await fetch(
        `https://www.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const now = new Date().toLocaleTimeString();

      setPrices((prev) => ({
        ...prev,
        [symbol]: {
          price: data.price,
          loading: false,
          lastUpdated: now,
        },
      }));
    } catch (error) {
      console.error(`Error fetching ${symbol} price:`, error);
      setPrices((prev) => ({
        ...prev,
        [symbol]: {
          ...prev[symbol],
          loading: false,
          price: prev[symbol]?.price || null,
        },
      }));
    }
  };

  useEffect(() => {
    // Initial fetch for all feeds
    PRICE_FEEDS.forEach((feed) => {
      if (feed.symbol) {
        fetchPrice(feed.symbol);
      }
    });

    setLoading(false);

    // Set up update interval
    const interval = setInterval(() => {
      PRICE_FEEDS.forEach((feed) => {
        if (feed.symbol) {
          fetchPrice(feed.symbol);
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const updateFeed = async (feed: SwitchboardFeed) => {
    if (!publicKey) {
      console.error("Wallet not connected");
      return;
    }

    try {
      setPrices((prev) => ({
        ...prev,
        [feed.symbol]: { ...prev[feed.symbol], loading: true },
      }));

      const { blockhash } = await connection.getLatestBlockhash("confirmed");

      const updateIx = {
        programId: switchboardProgramId,
        keys: [
          {
            pubkey: new PublicKey(feed.address),
            isSigner: false,
            isWritable: true,
          },
          { pubkey: publicKey, isSigner: true, isWritable: true },
        ],
        data: Buffer.from([]),
      };

      const messageV0 = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: blockhash,
        instructions: [updateIx],
      }).compileToLegacyMessage();

      const transaction = new VersionedTransaction(messageV0);

      const signature = await sendTransaction(transaction, connection, {
        skipPreflight: true,
        maxRetries: 3,
      });

      await connection.confirmTransaction(signature, "confirmed");
      await fetchPrice(feed.symbol);
    } catch (error) {
      console.error("Error updating feed:", error);
    } finally {
      setPrices((prev) => ({
        ...prev,
        [feed.symbol]: { ...prev[feed.symbol], loading: false },
      }));
    }
  };

  const formatPrice = (priceStr: string | null) => {
    if (!priceStr) return "---";
    const numPrice = parseFloat(priceStr);
    return `$${numPrice.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    );
  }

  return (
    <div className="max-w-[68rem] mx-auto border rounded-lg space-y-4 p-4 my-4">
      <div className="text-[27px] text-purple-200">On-Demand Feeds</div>

      <div className="flex border rounded-lg text-purple-500 font-bold px-4 py-3 justify-between items-center">
        <h1>FEEDS</h1>
        <span>VALUE</span>
      </div>

      {PRICE_FEEDS.map((feed) => (
        <Card key={feed.address} className="bg-[#18191B]">
          <CardContent className="p-4">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Feed Info - Left Side */}
              <div className="col-span-8">
                <div className="text-base text-gray-300 font-bold mb-1">
                  {feed.name}
                </div>
                <div className="text-sm text-gray-500 font-mono break-all">
                  {feed.address}
                </div>
              </div>

              {/* Price and Update Button - Right Side */}
              <div className="col-span-4 text-right">
                <div className="text-lg font-semibold mb-1">
                  {prices[feed.symbol]?.loading ? (
                    <div className="animate-pulse">Loading...</div>
                  ) : (
                    formatPrice(prices[feed.symbol]?.price)
                  )}
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  {prices[feed.symbol]?.lastUpdated || "Never"}
                </div>
                <button
                  onClick={() =>{
                    if(!publicKey){
                      toast.error("connect your wallet to continue");
                      return
                    }
                    updateFeed(feed)}
                  }
                  className="px-4 py-1.5 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={prices[feed.symbol]?.loading}
                >
                  Update Price
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SwitchboardPriceFeed;
