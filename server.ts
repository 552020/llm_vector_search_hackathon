import express from "express";
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
  headers: { "X-HuggingFace-Api-Key": HUGGINGFACE_API_KEY }, // Replace with your inference API key
});

const app = express();

app.get("/schema", (req, res) => {
  client.schema
    .getter()
    .do()
    .then((weaviateRes) => {
      res.send(weaviateRes);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
