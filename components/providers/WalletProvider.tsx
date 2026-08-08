"use client";

import React, { useMemo } from "react";
import { WalletManager, WalletId, NetworkId, WalletProvider } from "@txnlab/use-wallet-react";

export function AppWalletProvider({ children }: { children: React.ReactNode }) {
  const walletManager = useMemo(() => {
    return new WalletManager({
      wallets: [WalletId.PERA],
      defaultNetwork: NetworkId.TESTNET,
    });
  }, []);

  return <WalletProvider manager={walletManager}>{children}</WalletProvider>;
}
