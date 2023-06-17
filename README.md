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

## Notes

- What is Weaviate and what does it do?

Weaviate is a cloud-native, modular, real-time vector search engine built to scale your machine learning models. It allows to store data, enrich data with machine learning, perform CRUD operations, full-text searches, and vector searches to find the data based on the machine learning model.

Unlike traditional relational databases (RDBMS) such as MySQL or PostgreSQL, Weaviate is a vector database. While traditional databases are designed to store, retrieve, and manage structured data, Weaviate is designed specifically for vector data that comes from machine learning models.

In terms of functionality, Weaviate has characteristics of both a DBMS (Database Management System) and an ORM (Object-Relational Mapping).

On top of all this, Weaviate also offers automatic vectorization of data, and various machine learning functionalities which are not commonly found in traditional DBMS or ORMs. It is a part of the newer generation of databases that are designed to work well with AI and machine learning workflows.

- What is Hugging Face?

Hugging Face is an AI community and platform for developing, training, and deploying machine learning models, especially those related to Natural Language Processing (NLP). Hugging Face's transformers library provides thousands of pre-trained models to perform tasks on texts such as classification, information extraction, and translation.
