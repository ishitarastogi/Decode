import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import {
  getAuthenticationToken,
  getRefreshToken,
  setAuthenticationToken,
} from "../../../src/lib/apollo/auth/state";
import jwt_decode from "jwt-decode";

import { refreshAuth } from "../../../src/GraphQl/auth/refresh";
import { LENS_API_URL } from "../../constants";

// type decodedType = {
//   exp: number;
//   iat: number;
//   id: string;
//   role: string;
// };
let decoded;

// const APIURL = "https://api-mumbai.lens.dev/";
const httpLink = new HttpLink({ uri: LENS_API_URL });

const authLink = new ApolloLink((operation, forward) => {
  const token = getAuthenticationToken();
  const refreshToken = getRefreshToken();
  if (token) decoded = jwt_decode(token);

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      "x-access-token": token ? `Bearer ${token}` : "",
    },
  });

  if (token && decoded.exp < Date.now() / 1000) {
    refreshAuth(refreshToken).then((res) => {
      operation.setContext({
        headers: {
          "x-access-token": token
            ? `Bearer ${res.data.refresh.accessToken}`
            : "",
        },
      });
      setAuthenticationToken({ token: res.data.refresh });
    });
  }

  // Call the next link in the middleware chain.
  return forward(operation);
});

// export const apolloClient = new ApolloClient({
//   uri: APIURL,
//   cache: new InMemoryCache(),
// });

export const apolloClient = () => {
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    uri: LENS_API_URL,
    cache: new InMemoryCache({

    }),
  });
  return apolloClient;
};

// const lensPagination = (keyArgs) => {
//   return {
//     keyArgs: [keyArgs],
//     merge(existing, incoming) {
//       if (!existing) {
//         return incoming;
//       }
//       const existingItems = existing.items;
//       const incomingItems = incoming.items;

//       return {
//         items: existingItems.concat(incomingItems),
//         pageInfo: incoming.pageInfo,
//       };
//     },
//   };
// };
