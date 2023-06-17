import { Request, Response, NextFunction } from "express";
import { WeaviateClient } from "weaviate-ts-client";
import client from "../config";

export async function checkSchema(req: Request, res: Response, next: NextFunction) {
  try {
    // Get the current schema from the Weaviate client
    const currentSchema = await client.schema.getter().do();

    // Compare the current schema with your defined schema
    const definedSchema = [
      {
        class: "Question",
        vectorizer: "text2vec-huggingface",
        moduleConfig: {
          "text2vec-huggingface": {
            model: "sentence-transformers/all-MiniLM-L6-v2",
            options: {
              waitForModel: true,
            },
          },
        },
      },
      // Add any other classes and their corresponding schema definitions here
    ];

    // Check if the schemas match
    const schemasMatch = JSON.stringify(currentSchema) === JSON.stringify(definedSchema);

    if (!schemasMatch) {
      // If the schemas don't match, throw an error or handle it as desired
      throw new Error("Schema mismatch");
    }

    // If the schemas match, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Schema check error:", error);
    res.status(500).send("Internal Server Error");
  }
}
