import React from "react";
import { Publications } from "../../../src/components/publications/Publications";
import { GET_PROFILES } from "../../../src/GraphQl/profile/get-profiles";
import { useAccount } from "wagmi";

import { useQuery } from "@apollo/client";
export const LandingPage = () => {
     const { data: accountData } = useAccount();
     const { data: profileData } = useQuery(GET_PROFILES, {
       variables: {
         request: { ownedBy: [accountData?.address] },
       },
     });

     // console.log("profileData", profileData);
  if (!profileData) return null;

     const currentUser = profileData.profiles.items[0];
  return (
    <div>
     {currentUser? <Publications currentUser={currentUser} />:<h1>not logged in</h1>}
    </div>
  );
};
