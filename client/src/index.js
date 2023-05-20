import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider, darkTheme, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { injectedWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import { avalanche, avalancheFuji, mainnet } from "wagmi/chains";
import { Chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

export const avalancheTest = {
  id: 2000777,
  name: "Glitch Hackathon DEVNET",
  network: "avalanche",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche",
    symbol: "AVAX",
  },
  rpcUrls: {
    public: { http: ["http://aops-custom-202305-2crvsg-nlb-1d600174371701f9.elb.ap-northeast-2.amazonaws.com:9650/ext/bc/XpX1yGquejU5cma1qERzkHKDh4fsPKs4NttnS1tErigPzugx5/rpc"] },
  },
};

const { chains, provider } = configureChains(
  [avalancheTest],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.REACT_APP_EVM_CHAIN_RPC_URL,
      }),
    }),
  ]
);

const { wallets } = getDefaultWallets({
  appName: "tapCheck",
  projectId: "db4d39a0869ab9ff9d0ccf4f78275da1",
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [injectedWallet({ chains })],
  },
]);

const injected = injectedWallet({
  options: {
    chains,
  },
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient: createPublicClient({
    chain: avalanche,
    transport: http(),
  }),
});

// const config = createConfig({
//   autoConnect: true,
//   connectors,
//   provider,
// });

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <WagmiConfig config={config}>
          <RainbowKitProvider
            chains={chains}
            theme={darkTheme({
              accentColor: "#EF5CD8",
            })}
            showRecentTransactions={true}
          >
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </RainbowKitProvider>
        </WagmiConfig>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
