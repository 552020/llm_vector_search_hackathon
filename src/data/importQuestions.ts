import fetch from "node-fetch";
import client from "../config";
import { ObjectsBatcher } from "weaviate-ts-client";

interface Question {
  Answer: string;
  Question: string;
  Category: string;
  vector: number[];
}

async function getJsonData() {
  const url = "https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
export default async function importQuestions() {
  // Get the questions directly from the URL
  const data: Question[] = (await getJsonData()) as Question[];

  let batcher: ObjectsBatcher = client.batch.objectsBatcher();

  let counter = 0;
  let batchSize = 100;

  for (const question of data) {
    // Construct an object with a class and properties 'answer', 'question', 'category', and 'vector'
    const obj = {
      class: "Question",
      properties: {
        answer: question.Answer,
        question: question.Question,
        category: question.Category,
      },
      vector: question.vector,
    };

    // Add the object to the batcher
    batcher = batcher.withObject(obj);

    // When the batch size is reached, flush the batcher
    if (counter++ == batchSize) {
      const res = await batcher.do();
      console.log(res);

      // Reset the batcher
      counter = 0;
      batcher = client.batch.objectsBatcher();
    }
  }

  // Flush the remaining objects
  const res = await batcher.do();
  console.log(res);
}
