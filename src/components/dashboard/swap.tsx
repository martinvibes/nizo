import React, { useState } from 'react';
import { useJupiterSwap } from '@/api/jupiter-swap-example';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const TokenSwapComponent = () => {
  const [inputAmount, setInputAmount] = useState('');
  const [inputToken, setInputToken] = useState('So11111111111111111111111111111111111111112');
  const [outputToken, setOutputToken] = useState('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
  const [txResult, setTxResult] = useState('');
  
  const { connected } = useWallet();
  const { swap, error, loading } = useJupiterSwap("https://api.mainnet-beta.solana.com");

  const handleSwap = async () => {
    try {
      if (!connected) {
        setTxResult('Please connect your wallet first');
        return;
      }

      // Validate input amount
      const amount = parseFloat(inputAmount);
      if (isNaN(amount) || amount <= 0) {
        setTxResult('Please enter a valid amount');
        return;
      }

      // Convert input amount to lamports (multiply by 10^9 for SOL)
      const lamports = Math.round(amount * 1000000000);
      
      console.log('Swapping with params:', {
        inputAmount: lamports,
        inputMint: inputToken,
        outputMint: outputToken
      });

      const txid = await swap({
        inputAmount: lamports,
        inputMint: inputToken,
        outputMint: outputToken,
        slippageBps: 50
      });

      setTxResult(`Swap successful! Transaction: ${txid}`);
    } catch (err: any) {
      setTxResult(`Swap failed: ${err.message}`);
    }
  };

  // Predefined token list with verified addresses
  const tokenOptions = [
    { label: 'SOL', value: 'So11111111111111111111111111111111111111112' },
    { label: 'USDC', value: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' },
    { label: 'BONK', value: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' }
  ];

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow">
  

      <h2 className="text-2xl font-bold mb-4">Swap Tokens</h2>
      
      {/* <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter amount"
            min="0"
            step="0.000000001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">From Token</label>
          <select
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {tokenOptions.map(token => (
              <option key={token.value} value={token.value}>
                {token.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">To Token</label>
          <select
            value={outputToken}
            onChange={(e) => setOutputToken(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {tokenOptions.map(token => (
              <option key={token.value} value={token.value}>
                {token.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSwap}
          disabled={loading || !inputAmount || !connected}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {!connected ? 'Connect Wallet First' : loading ? 'Swapping...' : 'Swap'}
        </button>

        {error && (
          <div className="text-red-600 text-sm mt-2">
            {error}
          </div>
        )}

        {txResult && (
          <div className="text-sm mt-2 p-2 bg-gray-100 rounded">
            {txResult}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default TokenSwapComponent;