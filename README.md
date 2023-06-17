# Hackaton LLM Vector Search Stub

We setup a node.js/express server with Typscript and we follows the Quickstart tutorial of Weaviate tutorial.

## Concepts

- **Vector Database**

A vector database is a type of database that uses vectors (arrays of numbers) to represent data. They are often used in conjunction with machine learning algorithms, as they allow for efficient similarity searches, where you can query for items most similar to a given input. The main advantage of vector databases is their ability to perform these similarity searches much more efficiently than traditional relational databases.

- **Vectorizer**

A vectorizer is a tool or algorithm that converts input data into a numerical vector representation. This process is also known as feature extraction. In the context of Natural Language Processing (NLP), a vectorizer might take a text string as input and output a numerical vector that represents the semantic content of the text. This allows machine learning algorithms to work with text data in an efficient and meaningful way.

This would be the snippet to use the vectorizer of OPenAI:

```
class_obj = {
  "class": "Question",
  "vectorizer": "text2vec-openai",
  "moduleConfig": {
    "text2vec-openai": {
      "model": "ada",
      "modelVersion": "002",
      "type": "text"
    }
  }
}
```

For other vectorizer functions check: https://weaviate.io/developers/weaviate/quickstart#define-a-class

## Technologies & Services

- Tyepscript
- Node.js
- Express.js
- Weaviate
- Weaviate Typescript Client
- Hugging Face

## File Structre Overview - after fist refactoring

The initial version of the application had all the code residing in a single file (server.ts). This monolithic structure can become hard to maintain and understand as the application grows. To improve the codebase's maintainability, readability, and modularity, it was refactored into multiple files, each with a distinct responsibility.

The updated application has the following file structure:

project
│
├── src
│ ├── index.ts # The application's entry point
│ ├── schema
│ │ ├── index.ts # Functions for managing the Weaviate schema
│ │ └── types.ts # Type definitions related to the schema
│ ├── data
│ │ ├── index.ts # Functions for importing data into Weaviate
│ │ └── types.ts # Type definitions related to the data
│ └── utils
│ └── client.ts # Initializes the Weaviate client
│
├── server.ts # Sets up the Express server
└── README.md

Here's a summary of what each file/module does:

_src/index.ts_: This is the application's main entry point. It initializes the server and starts listening for requests.

_src/config/index.tsa_: This module contains all your configuration-related code, including setting up the Weaviate client and other environment-dependent values.

_src/schema/index.ts_ and _src/schema/Question.ts_: These modules contain code related to the Weaviate schema. The Question.ts module defines the Question class, and the index.ts module contains the function to add the schema to Weaviate.

_src/routes/index.ts_ and _src/routes/schema.ts_: These modules contain the Express routes. The schema.ts module defines the /schema endpoint, and the index.ts module combines all your routes into a single Express Router instance.

_src/data/index.ts_ and _src/data/importQuestions.ts_: These modules contain code for importing data into Weaviate. The importQuestions.ts module contains the code to fetch the questions from the URL and add them to Weaviate, and the index.ts module exports a function to perform all necessary data imports.

_.env_: This file contains your environment variables, which should not be committed to your version control system.\*

_package.json_ and _tsconfig.json_: These are standard Node.js and TypeScript configuration files.

## Notes

- What is Weaviate and what does it do?

Weaviate is a cloud-native, modular, real-time vector search engine built to scale your machine learning models. It allows to store data, enrich data with machine learning, perform CRUD operations, full-text searches, and vector searches to find the data based on the machine learning model.

Unlike traditional relational databases (RDBMS) such as MySQL or PostgreSQL, Weaviate is a vector database. While traditional databases are designed to store, retrieve, and manage structured data, Weaviate is designed specifically for vector data that comes from machine learning models.

In terms of functionality, Weaviate has characteristics of both a DBMS (Database Management System) and an ORM (Object-Relational Mapping).

On top of all this, Weaviate also offers automatic vectorization of data, and various machine learning functionalities which are not commonly found in traditional DBMS or ORMs. It is a part of the newer generation of databases that are designed to work well with AI and machine learning workflows.

- What is Hugging Face?

Hugging Face is an AI community and platform for developing, training, and deploying machine learning models, especially those related to Natural Language Processing (NLP). Hugging Face's transformers library provides thousands of pre-trained models to perform tasks on texts such as classification, information extraction, and translation.
