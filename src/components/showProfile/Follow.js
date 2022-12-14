import React, { useState } from "react";
import { LENS_HUB_PROXY_ADDRESS } from "../../Config";

import { useSignTypedData, useContractWrite, useAccount } from "wagmi";
import { omit, splitSignature } from "../../lib/apollo/helpers";

import { useMutation } from "@apollo/client";
import { CREATE_FOLLOW_TYPED_DATA } from "../../api/follow/follow";

import LENS_ABI from "../../abis/Lens-Hub.json";

function Follow({ currentUser }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { address } = useAccount();
  const { signTypedDataAsync } = useSignTypedData();
  const { writeAsync } = useContractWrite({
    addressOrName: LENS_HUB_PROXY_ADDRESS,
    contractInterface: LENS_ABI,
    functionName: "followWithSig",
  });

  const [createFollowTypedData, {}] = useMutation(CREATE_FOLLOW_TYPED_DATA, {
    onCompleted({ createFollowTypedData }) {
      if (!createFollowTypedData) console.log("createFollow is null");

      const { typedData } = createFollowTypedData;
      const { profileIds, datas } = typedData?.value;

      signTypedDataAsync({
        domain: omit(typedData?.domain, "__typename"),
        types: omit(typedData?.types, "__typename"),
        value: omit(typedData?.value, "__typename"),
      }).then((res) => {
        const { v, r, s } = splitSignature(res);
        const postARGS = {
          follower: address,
          profileIds,
          datas,
          sig: {
            v,
            r,
            s,
            deadline: typedData.value.deadline,
          },
        };

        writeAsync({ args: postARGS })
          .then((res) => {
            res.wait(1).then(() => {
              setIsUpdating(false);
            });
          })
          .catch((error) => {
            console.log(error);
            setIsUpdating(false);
          });
      });
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleFollow = async () => {
    setIsUpdating(true);
    createFollowTypedData({
      variables: {
        request: {
          follow: { profile: currentUser?.id },
        },
      },
    });
  };

  return (
    <>
      {isUpdating ? (
        <div className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  focus:border-blue-300 rounded max-w-max border bg-transparent border-purple-400 text-purple-400 px-4 py-1 items-center hover:shadow-lg">
          UPDATING
        </div>
      ) : (
        <button
          onClick={() => handleFollow()}
          className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  focus:border-blue-300 rounded max-w-max border bg-transparent border-purple-400 text-purple-400 hover:border-purple-800 hover:text-purple-500 px-4 py-1  items-center hover:shadow-lg"
        >
          FOLLOW
        </button>
      )}
    </>
  );
}

export default Follow;
