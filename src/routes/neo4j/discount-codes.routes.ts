import express from "express";
import { DiscountCode } from "../../models/neo4j/discount-code";
import { DiscountCodeService } from "../../services/neo4j/discount-code.service";
import { resultHandler } from "../../utils/response-handler.utils";

export const router = express.Router();
const DiscountCodesService = new DiscountCodeService(DiscountCode);

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
  valid_from: any;
  valid_to: any;
  remaining_uses: any;
  discount_type_id: any;
}) => {
  const {
    name,
    value,
    valid_from,
    valid_to,
    remaining_uses,
    discount_type_id,
  } = body;
  return {
    name,
    value,
    valid_from,
    valid_to,
    remaining_uses,
    discount_type_id,
  };
};

export default router;
