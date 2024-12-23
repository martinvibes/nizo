# NIZO - AI-Powered DeFi Agent

**NIZO** is an intelligent AI agent that simplifies DeFi operations on the Solana blockchain through natural language interactions. Built with Next.js and integrated with LangChain for AI processing, Jupiter swap api, NIZO enables users to perform complex DeFi transactions, check balances, and receive information through an intuitive chat interface.

🏆 Built for the Solana AI Hackathon (December 10-23, 2024)
This project is our submission to the first-ever Solana AI Hackathon, where developers worldwide compete to build innovative AI agents on the Solana blockchain. The hackathon features $185,000+ in cash prizes across multiple tracks focusing on AI agent development.

## 🌐 Live Demo

Try [NIZO](https://nizo-sol.vercel.app)
![NIZO Dashboard](/public/NIZOsnapshot.png)

## 🚀 Features

- Natural language processing for DeFi operations using LangChain
- Token swaps via Jupiter Protocol integration
- Real-time wallet balance checking on Solana
- Transaction history tracking
- Secure wallet management with Wallet Adapter
- Dark mode support
- Contact management system

## 📋 Technical Documentation

System Architecture

```bash
NIZO Architecture
├── Frontend (Next.js 14)
│   ├── Chat Interface (React)
│   ├── Wallet Connection (@solana/wallet-adapter)
│   └── UI Components (shadcn/ui)
├── AI Processing Layer
│   ├── LangChain Integration
│   └── GPT-4 Mini Model
└── Blockchain Integration
    ├── Jupiter Protocol (Swaps)
    └── Solana Web3.js
```

## User Flows

### Wallet Connection Flow

```typescript
// src/contexts/WalletProvider.tsx
export const WalletAdapterProvider = ({ children }: Props) => {
  const endpoint = clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider autoConnect wallets={wallets}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
```

### AI Processing Flow

```typescript
// src/api/langchain.ts
const IntentSchema = z.object({
  intent: z.enum(["swap", "checkBalance", "transfer", "normalChat", "unknown"]),
  amount: z.number().optional(),
  sourceToken: z.string().optional(),
  destinationToken: z.string().optional(),
  error: z.string().optional(),
  generalResponse: z.string(),
});
```

## API Integrations

### Jupiter Swap Integration

```typescript
// src/api/jupiter-swap-example.ts
const swap = async ({
  inputAmount,
  inputMint,
  outputMint,
  slippageBps = 50,
}: SwapParams): Promise<string> => {
  // ... swap implementation
};
```

### LangChain AI Integration

```typescript
const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
  apiKey: process.env.NEXT_PUBLIC_LANGCHAIN_API_KEY,
});
```

## 🎮 User Guide

### Requirements

Before running NIZO, ensure you have the following installed:

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)
- A Solana wallet (e.g., Phantom, Solflare)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/nizo.git
cd nizo
```

2. Install Dependencies:

```bash
npm install
```

3. Set up environment variables: Create a `.env.local` file in the root directory with the following variables:

```bash
# Required API Keys
NEXT_PUBLIC_LANGCHAIN_API_KEY=your_langchain_api_key
NEXT_PUBLIC_SOLANA_RPC_URL=your_solana_rpc_url  # Optional: Defaults to public endpoints

# Optional Configuration
NEXT_PUBLIC_ENVIRONMENT=development  # or production
```

4. Run the development server:

```bash
npm run dev
```

5. Run the linter to check code quality:

```bash
npm run lint
```

6. Build for production:

```bash
npm run build
```

7. Start production server:

```bash
npm start
```

**The application will be available at `http://localhost:3000`**

## Interacting with NIZO

NIZO uses a chat interface where you can input natural language commands. Here are some supported operations:

### Token swaps

```
User: "Swap 2 SOL to USDC"
NIZO: "I'll help you swap 2 SOL to USDC. Current rate is [rate]. Would you like to proceed?"
```

### Balance Checks

```
User: "What's my SOL balance?"
NIZO: "Your current SOL balance is [amount] SOL"
```

### Transaction History

```
User: "Show my recent transactions"
NIZO: "Here are your recent transactions: [list of transactions]"
```

## Supported Intent Types

Based on the implementation in langchain.ts:

- swap: Token swap operations
- checkBalance: Balance inquiries
- transfer: Token transfers
- normalChat: General inquiries
- unknown: Fallback for unrecognized intents

## 🔒 Security Measures

### Wallet Security

- Your wallet, your keys: We never store or have access to your wallet's private keys - only you control your funds
- Safe transaction signing: All transactions are signed directly in your browser using your personal wallet (like Phantom or Solflare)
- Reliable connections: We use multiple backup connection points to the Solana network to ensure the app stays working even if one connection fails

```typescript
const FALLBACK_RPCS = [
  "https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY",
  "https://try-rpc.mainnet.solana.com",
  // ...
];
```

### Transaction Security

- Price protection: We protect you from unexpected price changes during swaps (maximum price change allowed: 0.5%)
- Safety checks: We test each transaction before executing it to ensure it will work as expected
- Reliable processing: If one connection fails, we automatically try other secure connections
- Error protection: If something goes wrong, we have systems to help recover and fix the issue

```typescript
// Example of transaction security measures
const confirmation = await connection.confirmTransaction(txid, "confirmed");

if (confirmation.value.err) {
  throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`);
}
```

### Data Privacy

- Secure chat history: Your chat messages are only stored temporarily while you use the app
- No sensitive storage: We never store your private financial information
- Limited local storage: We only save basic information like contact names on your device
- Protected secrets: All sensitive API keys and configurations are securely stored and never exposed to users

## 💻 Project Structure

```
src/
├── api/                  # API integrations
├── app/                  # Next.js pages
├── components/          # React components
│   ├── actions/         # Transaction actions
│   ├── dashboard/       # Dashboard UI
│   ├── ui/              # Shared UI components
├── contexts/            # React contexts
└── lib/                 # Utilities
```

## 🛠️ Technology Stack

- Frontend: Next.js 14
- UI Components: shadcn/ui
- Blockchain: Solana Web3.js
- DEX Aggregator: Jupiter Protocol
- AI Processing: LangChain with GPT-4 Mini
- Wallet: Solana Wallet Adapter
- Styling: Tailwind CSS

## 📈 Performance Considerations

- Quick Response Time: The app shows you immediate feedback for your actions while processing happens in the background, making everything feel faster
- Efficient Chat History: Your chat messages are managed right in your browser, making conversations quick and responsive
- Eye-Friendly Design: Switch between light and dark themes based on your preference to make the app comfortable to use, especially during long sessions

## 🔄 State Management

Messages and chat history are managed through React Context:

```typescript
export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## 🆘 Support

For support, please:

- Open an issue on [GitHub](https://github.com/martinvibes/nizo)

<hr>
Built with ❤️ by the NIZO team
