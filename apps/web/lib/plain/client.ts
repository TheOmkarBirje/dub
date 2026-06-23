import { PlainClient } from "@team-plain/typescript-sdk";

const getPlainClient = (): PlainClient => {
  const apiKey = process.env.PLAIN_API_KEY;
  if (!apiKey) {
    return new Proxy({} as PlainClient, {
      get(target, prop) {
        return () => {
          throw new Error("Plain API key is missing. Please set PLAIN_API_KEY in your environment.");
        };
      },
    });
  }
  return new PlainClient({ apiKey });
};

export const plain = getPlainClient();

export type PlainUser = {
  id: string;
  name: string | null;
  email: string | null;
};
