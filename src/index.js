import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { apolloClient } from "../src/lib/apollo/apollo-client";
import { BrowserRouter } from "react-router-dom";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import App from "./App";
import "./index.css";

import { ApolloProvider } from "@apollo/client";
import { DAppProvider } from "@usedapp/core";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faXmarkSquare,
  faBars,
  faCodePullRequest,
  faCoffee,
  faCaretUp,
  faCode,
  faUser,
  faHeart,
  faComment,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faCodePullRequest,
  faXmarkSquare,
  faBars,
  faComment,
  faCode,
  faHeart,
  faUser,
  faCoffee,
  faCaretUp,
  faMoneyBill
);
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
  [
    alchemyProvider({ alchemyId: "" }),
    publicProvider(),
  ]
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
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient()}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <BrowserRouter>
            <App />
          </BrowserRouter>{" "}
        </RainbowKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
