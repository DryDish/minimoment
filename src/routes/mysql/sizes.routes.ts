import express from "express";
import { Size } from "../../models/mysql/size";
import { GenericService } from "../../services/mysql/generic-model.service";
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
  widthMm: any;
  heightMm: any;
  price: any;
}) => {
  const { name, widthMm, heightMm, price } = body;
  return { name, widthMm, heightMm, price };
};

export default router;
