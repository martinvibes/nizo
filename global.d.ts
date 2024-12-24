import { Buffer } from "buffer";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Wallet } from "@solana/wallet-adapter-react";
import { VersionedTransaction } from "@solana/web3.js";

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

declare module "@solana/wallet-adapter-base" {
  interface Wallet {
    signTransaction<T extends VersionedTransaction>(tx: T): Promise<T>;
    signAllTransactions<T extends VersionedTransaction>(txs: T[]): Promise<T[]>;
  }
}
