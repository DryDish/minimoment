import express from "express";
import { PaperType } from "../../models/mysql/paper-type";
import { GenericService } from "../../services/mysql/generic-model.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const paperTypeService = new GenericService(PaperType);

router.get("/", async (_, res) => {
  const result = await paperTypeService.findAll();
  resultHandler("Paper types", result, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await paperTypeService.findOne(id);
  resultHandler("Paper type", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await paperTypeService.create(requestObject);
  resultHandler("Paper type", result, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await paperTypeService.update(id, requestObject);
  resultHandler("Paper type", result, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await paperTypeService.delete(id);
  resultHandler("Paper type", result, res);
});

const filterBody = (body: {
  name: any;
  multiplier: any;
  sizeId: any;
  discountCodeId: any;
}) => {
  const { name, multiplier, sizeId, discountCodeId } = body;
  return { name, multiplier, sizeId, discountCodeId };
};

export default router;
