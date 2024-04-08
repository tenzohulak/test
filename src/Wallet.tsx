
import { ReactNode, useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { SolflareWalletAdapter } from '@solflare-wallet/wallet-adapter';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";


function SolanaProvider({ children }: { children: ReactNode }) {
    const solNetwork = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
    //const endpoint = 'https://mainnet.helius-rpc.com/?api-key=681c509e-97eb-4b9f-9817-27e71a6df0bd' //clusterApiUrl(solNetwork), [solNetwork]);
    const wallets = useMemo(() => [
        new SolflareWalletAdapter()
      ], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
        <WalletProvider autoConnect={true} wallets={wallets}  onError={console.log}>
          <WalletModalProvider>
            <WalletMultiButton></WalletMultiButton>
            {children}
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    );
}

export default SolanaProvider;