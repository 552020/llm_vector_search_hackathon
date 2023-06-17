import client from "../config";
import Question from "./Question";

export async function initializeSchema() {
  //   const existingSchema = await client.schema.get().do();
  const existingSchema = await client.schema.getter().do();
  if (existingSchema && existingSchema.classes && existingSchema.classes.find((c) => c.class === "Question")) {
    console.log("Schema already initialized");
    return;
  }

  const res = await client.schema.classCreator().withClass(Question).do();
  console.log(res);
}
