import { useState } from 'react';
import { useJupiterSwap } from '@/api/jupiter-swap-example';
import { useWallet } from '@solana/wallet-adapter-react';

const useTokenSwap = () => {
  const [txResult, setTxResult] = useState('');
  const { connected } = useWallet();
  const { swap, error, loading } = useJupiterSwap("https://api.mainnet-beta.solana.com");

  const handleSwap = async (inputAmount: string, inputToken: string, outputToken: string) => {
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

      setTxResult(`Swap successful! Transaction: https://explorer.solana.com/tx/${txid}`);
    } catch (err) {
      setTxResult(`Swap failed: ${(err as Error).message}`);
    }
  };

  return {
    handleSwap,
    txResult,
    error,
    loading
  };
};

export default useTokenSwap;

// Example usage of useTokenSwap hook
// import React, { useState } from 'react';
// import useTokenSwap from './swap';

// const SwapComponent = () => {
//   const { handleSwap, txResult, error, loading } = useTokenSwap();
//   const [inputAmount, setInputAmount] = useState('');
//   const [inputToken, setInputToken] = useState('');
//   const [outputToken, setOutputToken] = useState('');

//   const onSwapClick = async () => {
//     await handleSwap(inputAmount, inputToken, outputToken);
//     console.log(txResult);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Input Amount"
//         value={inputAmount}
//         onChange={(e) => setInputAmount(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Input Token"
//         value={inputToken}
//         onChange={(e) => setInputToken(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Output Token"
//         value={outputToken}
//         onChange={(e) => setOutputToken(e.target.value)}
//       />
//       <button onClick={onSwapClick} disabled={loading}>
//         Swap
//       </button>
//       {txResult && <p>{txResult}</p>}
//       {error && <p>Error: {error.message}</p>}
//     </div>
//   );
// };

// export default SwapComponent;