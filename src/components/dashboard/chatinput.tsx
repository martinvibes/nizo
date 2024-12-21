import { memo } from 'react';
import { PlaceholdersAndVanishInput } from "@/components/ui/input-design";

interface ChatInputProps {
	input: string;
	isLoading: boolean;
	onInputChange: (value: string) => void;
	onSend: () => void;
}

export const ChatInput = memo(function ChatInput({ input, isLoading, onInputChange, onSend }: ChatInputProps) {
	const placeholders = [
		"Swap 0.01 ETH to USDC",
		"Check my Nostra LP positions",
		"What's the price of ETH on Starknet?",
		"Show my Nostra pool rewards",
		"Add liquidity to ETH/USDC pool",
		"Remove liquidity from ETH/USDC pool",
		"Check my token balances",
	];

	return (
		<div className="flex-1">
			<PlaceholdersAndVanishInput
				placeholders={placeholders}
				onChange={(e: any) => onInputChange(e.target.value)}
				onSubmit={(e: any) => {
					e.preventDefault();
					onSend();
				}}
			/>
		</div>
	);
});