import express from "express";
import { Size } from "../../models/neo4j/size";
import { GenericService } from "../../services/neo4j/generic-model.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const sizeService = new GenericService(Size);

router.get("/", async (_, res) => {
  const result = await sizeService.findAll();
  resultHandler("Sizes", result, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await sizeService.findOne(id);
  resultHandler("Size", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await sizeService.create(requestObject);
  resultHandler("Size", result, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await sizeService.update(id, requestObject);
  resultHandler("Size", result, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await sizeService.delete(id);
  resultHandler("Size", result, res);
});

const filterBody = (body: {
  name: any;
  width_mm: any;
  height_mm: any;
  price: any;
}) => {
  const { name, width_mm, height_mm, price } = body;
  return { name, width_mm, height_mm, price };
};

export default router;
