import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { 
  PublicKey, 
  Transaction, 
  LAMPORTS_PER_SOL,
  SystemProgram 
} from "@solana/web3.js";
import { useMessages } from "@/contexts/store";

interface SendTransferFormProps {
  initialData: {
    amount: number;
    address: string;
    currency: string;
  };
  onSuccess: () => void;
  onClose: () => void;
}

const SendTransferForm = ({ initialData, onSuccess, onClose }: SendTransferFormProps) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    address: initialData.address,
    amount: initialData.amount,
    currency: initialData.currency
  });
  const { setMessages } = useMessages();

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
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports: formData.amount * LAMPORTS_PER_SOL,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Transaction failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Transaction failed";
      setError(errorMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: (prevMessages.length + 1).toString(),
          sender: "agent",
          content: `Transaction failed: ${errorMessage}. Please check your wallet balance and try again.`,
          balance: { sol: 0, usd: 0 }
        }
      ]);
      setTimeout(() => onClose(), 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-[#1A1B1F] rounded-lg p-6 max-w-md w-full border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">Confirm Transfer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Recipient Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md bg-[#2C2D33] text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md bg-[#2C2D33] text-white"
              step="any"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Currency
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md bg-[#2C2D33] text-white"
            >
              <option value="SOL">SOL</option>
              <option value="USDT">USDT</option>
            </select>
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-900/50 p-2 rounded">{error}</div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 py-2 px-4 rounded-md ${
                isLoading
                  ? "bg-blue-600/50"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {isLoading ? "Processing..." : "Confirm"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendTransferForm; 