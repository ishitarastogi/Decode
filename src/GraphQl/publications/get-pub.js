// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { gql } from "@apollo/client";
import { PostFragment } from "../fragments/PostFragment";

export const GET_PUBLICATIONS = gql`
  query ($request: PublicationsQueryRequest!) {
    publications(request: $request) {
      items {
        __typename
        ... on Post {
          ...PostFragment
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
  ${PostFragment}
`;

