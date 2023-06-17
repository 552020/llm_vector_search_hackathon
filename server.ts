import express, { Request, Response } from "express";
import weaviate, { WeaviateClient, ApiKey, ObjectsBatcher } from "weaviate-ts-client";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const CLUSTER_URL = process.env.WEAVIATE_CLUSTER_URL;
const WEAVIATE_API_KEY = process.env.WEAVIATE_API_KEY;
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

const headers = {
  Authorization: `Bearer ${WEAVIATE_API_KEY}`,
};

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

let classObj = {
  class: "Question",
  vectorizer: "text2vec-huggingface", // If set to "none" you must always provide vectors yourself. Could be any other "text2vec-*" also.
  moduleConfig: {
    "text2vec-huggingface": {
      model: "sentence-transformers/all-MiniLM-L6-v2", // Can be any public or private Hugging Face model.
      options: {
        waitForModel: true,
      },
    },
  },
};

async function addSchema() {
  const res = await client.schema.classCreator().withClass(classObj).do();
  console.log(res);
}

app.get("/schema", (req: Request, res: Response) => {
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

interface Question {
  Answer: string;
  Question: string;
  Category: string;
  vector: number[];
}

// Add this function to import data
async function importQuestions() {
  const url =
    "https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny_with_vectors_all-MiniLM-L6-v2.json";

  // Fetch data from the URL
  const response = await fetch(url);
  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: Question[] = (await response.json()) as Question[]; // TODO: check this type assetion when you understand what is going on and what's the format of the data

  // Create a batcher
  let batcher: ObjectsBatcher = client.batch.objectsBatcher();
  let counter = 0;
  const batchSize = 100;

  for (const question of data) {
    // Construct an object with a class and properties 'answer' and 'question'
    const obj = {
      class: "Question",
      properties: {
        answer: question.Answer,
        question: question.Question,
        category: question.Category,
      },
      vector: question.vector, // Add the vector data to the object,
    };

    // add the object to the batch queue
    batcher = batcher.withObject(obj);

    // When the batch counter reaches batchSize, push the objects to Weaviate
    if (counter++ === batchSize) {
      // flush the batch queue
      const res = await batcher.do();
      console.log(res);

      // restart the batch queue
      counter = 0;
      batcher = client.batch.objectsBatcher();
    }
  }

  // Flush the remaining objects
  const res = await batcher.do();
  console.log(res);
}

const PORT = process.env.PORT || 3000;

async function start() {
  await addSchema();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();
