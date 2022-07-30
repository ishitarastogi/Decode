import { create } from "ipfs-http-client";
import { v4 as uuidv4 } from "uuid";

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export const uploadIpfs = async ({ data }) => {
  const result = await client.add(
    JSON.stringify({
      version: "1.0.0",
      metadata_id: uuidv4(),
      description: data.description,
      name: data.name,

      content: data.content,
      externalUrl: data.externalUrl,
      image: data.image,
      imageMimeType: data.imageMimeType,

      //   external_url: "https://www.gettyimages.in/photos/parrot",
      //   image:
      //     "https://lafeber.com/pet-birds/wp-content/uploads/2018/06/Indian-Ring-Necked-Parakeet.jpg",

      //   imageMimeType: "image/jpeg",
      // media: [
      //   {
      //     item: "https://ipfs.infura.io/ipfs/QmRv2297xNY9JRfmWvirkTFM54qkTv1vnCpXx8nSZMvise",
      //     type: "video/mp4",
      //   },
      // ],

      attributes: [],
      appId: "Decode",
    })
  );

  console.log("upload result ipfs", result);
  return result;
};
