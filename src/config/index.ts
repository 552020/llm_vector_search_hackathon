import weaviate, { WeaviateClient, ApiKey } from "weaviate-ts-client";

import dotenv from "dotenv";

dotenv.config();

const CLUSTER_URL = process.env.WEAVIATE_CLUSTER_URL;
const WEAVIATE_API_KEY = process.env.WEAVIATE_API_KEY;
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

if (CLUSTER_URL === undefined || WEAVIATE_API_KEY === undefined || HUGGINGFACE_API_KEY === undefined) {
  throw new Error("Environment variables are not set correctly");
}

const client: WeaviateClient = weaviate.client({
  scheme: "https",
  host: CLUSTER_URL,
  apiKey: new ApiKey(WEAVIATE_API_KEY),
  headers: { "X-HuggingFace-Api-Key": HUGGINGFACE_API_KEY },
});

export default client;
