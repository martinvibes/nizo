"use client";

import { WalletAdapterProvider } from "./WalletProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <WalletAdapterProvider>{children}</WalletAdapterProvider>;
};
