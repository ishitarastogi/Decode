import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROFILE } from "../../api/profile/create-profile";
import { DEFAULT_TOKEN } from "../../Config";
import "./Profile.css";
function CreateProfiles({ currentUser }) {
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [handle, setHandle] = useState("");
  const [profilePictureUri, setProfilePictureUri] = useState("");
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState("");

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
      <div>
        <div>Submitting...</div>
      </div>
    );
  if (error) return <div>Submission error! {error.message}</div>;

  const handleCreateProfile = async () => {
    setSubmitError("");
    await createProfile({
      variables: {
        request: {
          handle: handle,
          profilePictureUri: profilePictureUri,
          followModule: amount
            ? {
                feeFollowModule: {
                  amount: {
                    currency: DEFAULT_TOKEN,
                    value: amount,
                  },
                  recipient: recipient,
                },
              }
            : {
                freeFollowModule: true,
              },
        },
      },
    });
  };

  if (submitSuccess) return <div>{submitSuccess}</div>;

  return (
    <div>
      <div className="bold-lines"></div>
      <div className="containers">
        <div className="windows">
          <div className="overlays"></div>
          <div className="contents">
            <div className="welcomes">Hello There!</div>
            <div className="subtitles">Welcome to decode</div>
            <form onSubmit={handleCreateProfile}>
              <div className="input-fieldss">
                {" "}
                <input
                  className="input-line full-widths"
                  id="handle"
                  type="text"
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="Username"
                ></input>
                <input
                  className="input-line full-widths"
                  id="profilePictureUri"
                  type="url"
                  onChange={(e) => setProfilePictureUri(e.target.value)}
                  placeholder="profilePictureUri"
                ></input>
                <input
                  className="input-line full-widths"
                  id="token"
                  type="text"
                  value={DEFAULT_TOKEN}
                ></input>
                <input
                  className="input-line full-widths"
                  id="amount"
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount"
                ></input>{" "}
                <input
                  className="input-line full-widths"
                  id="recepient"
                  type="text"
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Enter Recepient Address"
                ></input>
              </div>
              <div>
                <button className="sub">Create Profile</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {submitError && <div>{submitError}</div>}
    </div>
  );
}
export default CreateProfiles;
