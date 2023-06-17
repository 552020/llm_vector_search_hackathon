import express, { Request, Response } from "express";
import weaviate, { WeaviateClient, ApiKey } from "weaviate-ts-client";
import dotenv from "dotenv";

dotenv.config();

const CLUSTER_URL = process.env.WEAVIATE_CLUSTER_URL;

if (CLUSTER_URL === undefined) {
  throw new Error("Environment variable for Weaviate cluster URL is not set correctly");
}

const client: WeaviateClient = weaviate.client({
  scheme: "https",
  host: CLUSTER_URL,
  apiKey: new ApiKey(""), // No API key needed for /ready endpoint
});

const app = express();

app.get("/ready", (req: Request, res: Response) => {
  const weaviateUrl = `${CLUSTER_URL}${req.originalUrl}`;
  console.log("Request URL:", weaviateUrl); // Log the complete URL

  console.log("Request URL:", req.url); // Print the request URL
  client.misc
    .readyChecker()
    .do()
    .then((weaviateRes: any) => {
      console.log(weaviateRes);
      res.send(weaviateRes);
    })
    .catch((err: any) => {
      console.error(err);
      res.status(500).send(err.message);
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server-test is running on port ${PORT}`);
});
