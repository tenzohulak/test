import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

interface TokenInfo {
  token: string;
  balance: number;
}

const App: React.FC = () => {
  const wallet = useWallet();
  const con = useConnection()
  
  const [tokens, setTokens] = useState<TokenInfo[] | null>(null);

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {

      con.connection.getParsedTokenAccountsByOwner(new PublicKey(wallet.publicKey?.toString() || ''), {programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')})
        .then(({value}) => setTokens(value.map(({account: {data: {parsed}}}) => ({token: parsed.info.mint, balance: parsed.info.tokenAmount.uiAmount}))))
        .catch(console.error);
    }
  }, [wallet]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {tokens && tokens.map(({token, balance}) => (
          <p key={token}>{token}: {balance}</p>
        ))}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App;
