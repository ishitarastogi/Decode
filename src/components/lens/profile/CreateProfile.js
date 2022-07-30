import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_PROFILE } from "../../../../src/GraphQl/profile/create-profile";
// import { Button } from "@/components/elements";

export const CreateProfile = () => {
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
    const [handle, setHandle] = useState("");

  const [createProfile, { data, loading, error }] = useMutation(
    CREATE_PROFILE,
    {
      onCompleted: () => {
        setSubmitError("");
        setSubmitSuccess(
          "Profile Created, it may take a few minutes to be visible.  Please refresh the page in a few minutes."
        );
      },
      onError: (error) => {
        console.log("create profile error", error);
        setSubmitError(error.message);
      },
    }
  );

  if (loading)
    return (
      <div className="mt-16 mx-auto h-44 w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 rounded-lg shadow-lg max-w-2xl">
        <div className="text-xl font-bold cursor-pointer">Submitting...</div>
      </div>
    );
  if (error)
    return (
      <div className="mt-16 mx-auto h-44 w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 rounded-lg shadow-lg max-w-2xl">
        <div className="text-xl font-bold cursor-pointer text-red-600">
          Submission error! {error.message}
        </div>
      </div>
    );

  const handleCreateProfile = async () => {
    setSubmitError("");
    await createProfile({
      variables: {
        request: {
          handle: handle, // this is a hack to get a unique handle, insert text instead to test availability
        },
      },
    });
  };
        
  if (submitSuccess)
    return (
      <div className="mt-16 mx-auto h-44 w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 rounded-lg shadow-lg max-w-2xl">
        <div className="p-4 rounded-xl font-bold text-lg text-center bg-green-700 text-gray-100">
          {submitSuccess}
        </div>
      </div>
    );

  return (
    <div className="mt-16 mx-auto h-44 w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 rounded-lg shadow-lg max-w-2xl">
      <h3>Create new Profile</h3>
      <form onSubmit={handleCreateProfile}>
          <label htmlFor="handle">Handle</label>
          <input 
            id="handle"
            type="text"
            onChange={(e) => setHandle(e.target.value)}
          />
        <button bg={"yellow_accent"} color={"white"} mt={5} type="submit">
          Create Profile
        </button>
      </form>

      {/* <div className="text-center font-bold p-4">Create a profile to post</div>
      <p className="italic text-center p-2">
        profiles can only be created on Mumbai testnet
      </p>
      <button className="" onClick={() => handleCreateProfile()}>
        Create A New Profile
      </button> */}
      {submitError && (
        <div className="text-red-600 text-center text-xl">{submitError}</div>
      )}
    </div>
  );
};
