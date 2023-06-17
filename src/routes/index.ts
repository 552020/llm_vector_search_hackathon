import express from "express";
import schemaRoutes from "./schema";

const app = express();

app.use(schemaRoutes);

export default app;
