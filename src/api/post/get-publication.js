import { gql } from "@apollo/client";

import { PostFragment } from "../fragments/PostFragment";
import { CommentFragment } from "../fragments/CommentFragment";
import { MirrorFragment } from "../fragments/MirrorFragment";

export const GET_PUBLICATIONS = gql`
  query ($request: PublicationsQueryRequest!) {
    publications(request: $request) {
      items {
        __typename
        ... on Post {
          ...PostFragment
        }
        ... on Comment {
          ...CommentFragment
        }
        ... on Mirror {
          ...MirrorFragment
        }
      }
      pageInfo {
        next
        totalCount
      }
    }
  }
  ${PostFragment}
  ${CommentFragment}
  ${MirrorFragment}
`;
