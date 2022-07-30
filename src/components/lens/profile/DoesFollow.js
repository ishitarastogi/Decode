import React, { useState } from "react";

import { useAccount } from "wagmi";
import { useQuery } from "@apollo/client";
import { DOES_FOLLOW } from "../../../../src/GraphQl/profile/does-follow";

import { FollowButton, UnfollowButton } from ".";


export const DoesFollow = ({ profileId }) => {
  const { data: accountData } = useAccount();

  const [isFollowing, setIsFollowing] = useState(false);

  const {
    data: doesFollowData,
    loading,
    refetch,
  } = useQuery(DOES_FOLLOW, {
    variables: {
      request: {
        followInfos: [
          {
            followerAddress: accountData?.address,
            profileId,
          },
        ],
      },
    },
    onCompleted: (data) => {
      const { doesFollow } = data;
      const { follows } = doesFollow[0];
      setIsFollowing(follows);
    },
  });

  // return null if loading
  if (loading) return null;
  // return null if no data
  if (!doesFollowData || !doesFollowData.doesFollow[0]) return null;

  const handleRefetch = async () => {
    await refetch();
  };

  if (isFollowing)
    return <UnfollowButton profileId={profileId} refetch={handleRefetch} />;
  else return <FollowButton profileId={profileId} refetch={handleRefetch} />;
};
