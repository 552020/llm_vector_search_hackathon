import app from "./routes";
import { initializeSchema } from "./schema";
import { importQuestions } from "./data";
import { checkSchema } from "./middlewares/checkSchema";

const PORT = process.env.PORT || 3000;

async function start() {
  await initializeSchema();
  await importQuestions();
  app.get("/schema", checkSchema, (req, res) => {
    // Your existing code for retrieving the schema
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();
