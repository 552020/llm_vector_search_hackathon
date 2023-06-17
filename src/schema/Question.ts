const Question = {
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
};

export default Question;
