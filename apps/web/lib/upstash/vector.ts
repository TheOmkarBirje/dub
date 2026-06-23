import { Index } from "@upstash/vector";

const getVectorIndex = () => {
  const url = process.env.UPSTASH_VECTOR_REST_URL;
  const token = process.env.UPSTASH_VECTOR_REST_TOKEN;

  if (!url || !token) {
    return new Proxy({} as Index, {
      get(target, prop) {
        return () => {
          throw new Error("Upstash Vector credentials (UPSTASH_VECTOR_REST_URL or UPSTASH_VECTOR_REST_TOKEN) are missing. Please configure them in your environment.");
        };
      },
    });
  }

  return new Index({ url, token });
};

export const vectorIndex = getVectorIndex();
