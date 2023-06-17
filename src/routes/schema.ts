import { Router } from "express";
import client from "../config";

const router = Router();

router.get("/schema", (req, res) => {
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

export default router;
