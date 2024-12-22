import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { 
  PublicKey, 
  Transaction, 
  LAMPORTS_PER_SOL,
  SystemProgram 
} from "@solana/web3.js";
import { 
  createTransferInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

// USDT token mint address on Solana (this is for devnet - replace with mainnet address if needed)
const USDT_MINT = new PublicKey("Your_USDT_Token_Mint_Address");

interface FormData {
  address: string;
  amount: string;
  currency: "SOL" | "USDT";
}

const SendTransactionForm = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    address: "",
    amount: "",
    currency: "SOL",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey) {
      setError("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const recipientPubKey = new PublicKey(formData.address);
      const amount = Number(formData.amount);

      if (formData.currency === "SOL") {
        await handleSolTransfer(recipientPubKey, amount);
      } else {
        await handleUsdtTransfer(recipientPubKey, amount);
      }
    } catch (err) {
      console.error("Transaction failed:", err);
      setError(err instanceof Error ? err.message : "Transaction failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSolTransfer = async (recipient: PublicKey, amount: number) => {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey!,
        toPubkey: recipient,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, "confirmed");
    console.log("SOL transfer successful:", signature);
  };

  const handleUsdtTransfer = async (recipient: PublicKey, amount: number) => {
    // Get the token accounts for sender and recipient
    const senderTokenAccount = await getAssociatedTokenAddress(
      USDT_MINT,
      publicKey!
    );

    const recipientTokenAccount = await getAssociatedTokenAddress(
      USDT_MINT,
      recipient
    );

    // Create transfer instruction
    const transferInstruction = createTransferInstruction(
      senderTokenAccount,
      recipientTokenAccount,
      publicKey!,
      amount * (10 ** 6), // Assuming USDT has 6 decimals
      [],
      TOKEN_PROGRAM_ID
    );

    const transaction = new Transaction().add(transferInstruction);

    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, "confirmed");
    console.log("USDT transfer successful:", signature);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Send Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Recipient Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter Solana address"
            required
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-1">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter amount"
            step="any"
            min="0"
            required
          />
        </div>

        <div>
          <label htmlFor="currency" className="block text-sm font-medium mb-1">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="SOL">SOL</option>
            <option value="USDT">USDT</option>
          </select>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md transition-colors ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isLoading ? "Processing..." : "Send Transaction"}
        </button>
      </form>
    </div>
  );
};

export default SendTransactionForm;