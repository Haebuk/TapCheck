import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider, darkTheme, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { injectedWallet, metaMaskWallet, rainbowWallet, walletConnectWallet, trustWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import { avalanche, avalancheFuji, mainnet } from "wagmi/chains";

import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { BrowserRouter } from "react-router-dom";

const { chains, provider } = configureChains(
  [avalanche, avalancheFuji],
  [
    infuraProvider("sepolia", {
      projectId: process.env.REACT_APP_INFURA_PROVIDER_ID,
      projectSecret: process.env.REACT_APP_INFURA_KEY,
    }),
    publicProvider({ priority: 1 }),
  ]
);

// const { connectors } = getDefaultWallets({
//   appName: "UR",
//   projectId: "5dea92e0ca764ce4a7bee86f431281b2",
//   chains,
// });

const connectors = connectorsForWallets([
  {
    groupName: "tapCheck",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ projectId: "db4d39a0869ab9ff9d0ccf4f78275da1", chains }),
      trustWallet({ projectId: "db4d39a0869ab9ff9d0ccf4f78275da1", chains }),
      rainbowWallet({ projectId: "db4d39a0869ab9ff9d0ccf4f78275da1", chains }),
      walletConnectWallet({ projectId: "db4d39a0869ab9ff9d0ccf4f78275da1", chains }),
    ],
  },
]);

const injected = injectedWallet({
  options: {
    chains,
  },
});

console.log(injected);

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

// console.log(wagmiConfig.queryClient);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
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
        </RainbowKitProvider>
      </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
