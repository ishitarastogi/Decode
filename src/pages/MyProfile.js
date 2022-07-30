import React from "react";
import ShowProfile from "../components/showProfile/ShowProfile";
import { GET_PROFILES } from "../api/profile/get-profiles";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { GET_PUBLICATIONS } from "../api/post/get-publication";
function MyProfile() {
  const { data: accountData } = useAccount();
  const { data: profileData } = useQuery(GET_PROFILES, {
    variables: {
      request: { ownedBy: [accountData?.address] },
    },
  });

  const currentUser = profileData?.profiles?.items[0];
  const id = currentUser?.id;
  const { data: pubData } = useQuery(GET_PUBLICATIONS, {
    variables: {
      request: {
        profileId: id,
        publicationTypes: ["POST"],
        limit: 10,
      },
    },
  });

  if (!pubData) return null;
  const publication = pubData?.publications?.items[0];

  console.log(currentUser);
  console.log(pubData?.publications?.items[0].metadata);
  console.log(pubData);
  return (
    <div>
      <ShowProfile currentUser={currentUser} publication={publication} />
    </div>
  );
}

export default MyProfile;
