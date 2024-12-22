"use client";

import { WalletAdapterProvider } from "./WalletProvider";
import { MessageProvider } from "./store";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WalletAdapterProvider>
      <MessageProvider>{children}</MessageProvider>
    </WalletAdapterProvider>
  );
};
