import React from "react";
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../src/lib/apollo/apollo-client";

import App from "./App";

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.polygonMumbai,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    ...(process.env.REACT_APP_ENABLE_TESTNETS === "true"
      ? [chain.polygonMumbai, chain.kovan, chain.rinkeby, chain.ropsten]
      : []),
  ],
  [alchemyProvider({ alchemyId: process.env.API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit demo",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ApolloProvider client={apolloClient()}>
          <HashRouter>
            <App />
          </HashRouter>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
