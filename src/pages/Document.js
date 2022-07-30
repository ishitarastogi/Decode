import React from "react";
import { GET_PROFILES } from "../api/profile/get-profiles";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { Redirect } from "react-router-dom";
import Docs from "../components/docs/Docs";
function Document() {
     const { data: accountData } = useAccount();
     const { data: profileData } = useQuery(GET_PROFILES, {
       variables: {
         request: { ownedBy: [accountData?.address] },
       },
     });

   if (!profileData) return null;
   const currentUser = profileData.profiles.items[0];

   if (!currentUser) return <div>{<Redirect to="createProfile/" />}</div>;
  return (
    <div>
      <Docs currentUser={currentUser}  />
    </div>
  );
}

export default Document;
