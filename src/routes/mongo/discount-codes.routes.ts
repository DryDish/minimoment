import express from "express";
import { validateId } from "../../middleware/mongo-validators";
import {
  DiscountCode,
  DiscountCodeInterface,
} from "../../models/mongo/discount-code";
import { GenericService } from "../../services/mongo/generic-model.service";
import { resultHandler } from "../../utils/response-handler.utils";

export const router = express.Router();
const DiscountCodesService = new GenericService<DiscountCodeInterface>(DiscountCode);

router.get("/", async (_, res) => {
  const result = await DiscountCodesService.findAll();
  resultHandler("Discounts", result, res);
});

router.get("/:id", validateId, async (req, res) => {
  const { id } = req.params;

  const result = await DiscountCodesService.findOne(id);
  resultHandler("Discount", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await DiscountCodesService.create(requestObject);
  resultHandler("Discount", result, res);
});

router.patch("/:id", validateId, async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await DiscountCodesService.update(id, requestObject);
  resultHandler("Discount", result, res);
});

router.delete("/:id", validateId, async (req, res) => {
  const { id } = req.params;

  const result = await DiscountCodesService.delete(id);
  resultHandler("Discount", result, res);
});

const filterBody = (body: {
  name: any;
  value: any;
  validFrom: any;
  validTo: any;
  remainingUses: any;
  discountType: any;
}) => {
  const { name, value, validFrom, validTo, remainingUses, discountType } = body;
  return { name, value, validFrom, validTo, remainingUses, discountType };
};

export default router;
