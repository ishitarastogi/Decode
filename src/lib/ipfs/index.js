import { v4 as uuidv4 } from "uuid";

// @ts-ignore
import IPFSNetwork from "./ipfsNetwork";

const client = new IPFSNetwork();

// type uploadIpfsProps = {
//   payload: {
//     name: string;
//     description: string;
//     content: string;
//     media: any[];
//   };
// };

export const uploadIpfs = async (data) => {
  const result = await client.add(JSON.stringify(data));

  return result;
};
