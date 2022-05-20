import express from "express";
import { DiscountCode } from "../../models/mysql/discount-code";
import { GenericService } from "../../services/mysql/generic-model.service";
import { resultHandler } from "../../utils/response-handler.utils";

export const router = express.Router();
const DiscountCodesService = new GenericService(DiscountCode);

router.get("/", async (_, res) => {
  const result = await DiscountCodesService.findAll();
  resultHandler("Discounts", result, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await DiscountCodesService.findOne(id);
  resultHandler("Discount", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await DiscountCodesService.create(requestObject);
  resultHandler("Discount", result, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await DiscountCodesService.update(id, requestObject);
  resultHandler("Discount", result, res);
});

router.delete("/:id", async (req, res) => {
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
  discountTypeId: any;
}) => {
  const { name, value, validFrom, validTo, remainingUses, discountTypeId } =
    body;
  return { name, value, validFrom, validTo, remainingUses, discountTypeId };
};

export default router;
