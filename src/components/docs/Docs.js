import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST_TYPED_DATA } from "../../api/post/create-post";
import { omit, splitSignature } from "../../lib/apollo/helpers";
import { useSignTypedData, useContractWrite, useAccount } from "wagmi";
import { LENS_HUB_PROXY_ADDRESS } from "../../Config";
import { uploadIpfs } from "../../lib/ipfs";
import LENS_ABI from "../../abis/Lens-Hub.json";
import { create } from "ipfs-http-client";
import { DEFAULT_TOKEN } from "../../Config";

import "./Docs.css";
function Docs({ currentUser }) {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [image, setImage] = useState("");
  const [imageMimeType, setImageMimeType] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [media, setMedia] = useState("");
  const [mediaMimeType, setMediaMimeType] = useState("");
  const { signTypedDataAsync } = useSignTypedData();
  const [amount, setAmount] = useState(0);
  const [recepient, setRecipient] = useState("");
  const client = create("https://ipfs.infura.io:5001/api/v0");

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = "https://ipfs.infura.io/ipfs/" + added.path;
      setImage(url);
      console.log(e.target.files[0].type);
      setImageMimeType(e.target.files[0].type);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function onChanges(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = "https://ipfs.infura.io/ipfs/" + added.path;
      setMedia(url);
      console.log(e.target.files[0].type);
      setMediaMimeType(e.target.files[0].type);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  const { writeAsync } = useContractWrite(
    {
      addressOrName: LENS_HUB_PROXY_ADDRESS,
      contractInterface: LENS_ABI,
    },
    "postWithSig"
  );
  const [createPostTypedData, {}] = useMutation(CREATE_POST_TYPED_DATA, {
    onCompleted({ createPostTypedData }) {
      if (!createPostTypedData) console.log("createPost is null");
      const { typedData } = createPostTypedData;
      const {
        profileId,
        contentURI,
        collectModule,
        collectModuleInitData,
        referenceModule,
        referenceModuleInitData,
      } = typedData?.value;

      signTypedDataAsync({
        domain: omit(typedData?.domain, "__typename"),
        types: omit(typedData?.types, "__typename"),
        value: omit(typedData?.value, "__typename"),
      }).then((res) => {
        const { v, r, s } = splitSignature(res);
        const postARGS = {
          profileId,
          contentURI,
          collectModule,
          collectModuleInitData,
          referenceModule,
          referenceModuleInitData,
          sig: {
            v,
            r,
            s,
            deadline: typedData.value.deadline,
          },
        };
        writeAsync({ args: postARGS }).then((res) => {
          res.wait(1).then(() => {
            setIsPosting(false);
            setContent("");
          });
        });
      });
    },
    onError(error) {
      console.log(error);
      setIsPosting(false);
    },
  });
  const handlePost = async () => {
    if (!currentUser) return;
    setIsPosting(true);

    const data = {
      description: content,

      name,
      content,
      externalUrl,
      image,
      imageMimeType,
    };
    const result = await uploadIpfs({ data });
    console.log(data.image);
    console.log(data.imageMimeType);
    console.log(result);
    createPostTypedData({
      variables: {
        request: {
          profileId: currentUser.id,
          contentURI: "https://ipfs.infura.io/ipfs/" + result.path,
          collectModule: amount
            ? {
                limitedFeeCollectModule: {
                  collectLimit: "100000",
                  amount: {
                    currency: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
                    value: amount,
                  },
                  recipient: recepient,
                  referralFee: 0,
                },
              }
            : { freeCollectModule: { followerOnly: true } },
          referenceModule: {
            followerOnlyReferenceModule: false,
          },
        },
      },
    });
  };
  console.log(Image);
  if (isPosting) {
    return <div>Posting...</div>;
  }

  return (
    <div>
      <div className="bold-lines"></div>
      <div className="containers">
        <div className="windows">
          <div className="overlays"></div>
          <div className="contents">
            <div className="welcomes">Hello There!</div>
            <div className="subtitles">
              Upload your Documents, don't forhet to add Images. You can also
              add colllect Module to monetize your content. Collect module
              allows your followers to purchase that content and mint NFTs that
              link to the publication's ContentURI. You can also leave it empty.
            </div>
            <form onSubmit={handlePost}>
              <div className="input-fieldss">
                <input
                  className="input-line full-widths"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Topic Name"
                ></input>{" "}
                <br />
                <br />
                <input
                  className="input-line full-widths"
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Document Link"
                ></input>{" "}
                <br />
                <br />
                <label>
                  Select Image <br />
                  <br />
                </label>
                <input type="file" onChange={onChange} />
                <br />
                <br />
                <label>Enter content</label> <br />
                <br />
                <textarea
                  style={{ width: "100%", height: "100px" }}
                  id="content"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Content"
                ></textarea>
                <label></label>
                <input
                  className="input-line full-widths"
                  id="external"
                  type="url"
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  placeholder="Enter external url"
                ></input>
                <div className="collect">
                  <h2 style={{ display: "block" }}>
                    Collect Module (Optional)
                  </h2>{" "}
                  <p> </p>
                  <input
                    className="input-line full-widths"
                    id="external"
                    type="text"
                    value={DEFAULT_TOKEN}
                  ></input>
                  <input
                    className="input-line full-widths"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter Amount"
                  ></input>
                </div>
                <input
                  className="input-line full-widths"
                  type="text"
                  value={recepient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Enter Recepient Name"
                ></input>
              </div>

              <div>
                <button className="sub">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Docs;
