import express from "express";
import { DiscountType } from "../../models/mysql/discount-type";
import { GenericService } from "../../services/mysql/generic-model.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const DiscountTypeService = new GenericService(DiscountType);

router.get("/", async (_, res) => {
  const result = await DiscountTypeService.findAll();
  resultHandler("Discount Types", result, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await DiscountTypeService.findOne(id);
  resultHandler("Discount Type", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await DiscountTypeService.create(requestObject);
  resultHandler("Discount Type", result, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await DiscountTypeService.update(id, requestObject);
  resultHandler("Discount Type", result, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await DiscountTypeService.delete(id);
  resultHandler("Discount Type", result, res);
});

const filterBody = (body: { name: any }) => {
  const { name } = body;
  return { name };
};

export default router;
