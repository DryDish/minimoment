import express from "express";
import order from "../models/mysql/order";
import { OrderService } from "../services/mysql/order.service";
import { resultHandler } from "../utils/response-handler.utils";

const router = express.Router();
const orderService = new OrderService(order)


router.get("/", async (_, res) => {
  const result = await orderService.findAll();
  resultHandler("Orders", result, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await orderService.findOne(id);
  resultHandler("Order", result, res);
});

// GET order(s) by user id
router.get("/by-user/:userId", async (req, res) => {
  const { userId } = req.params;

  const result = await orderService.findByUserId(userId);
  resultHandler("Order", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await orderService.create(requestObject);
  resultHandler("Order", result, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await orderService.update(id, requestObject);
  resultHandler("Order", result, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await orderService.delete(id);
  resultHandler("Order", result, res);
});

const filterBody = (body: {
  discountCodeId: any;
  userId: any;
  billingContactInfoId: any;
  statusId: any;
  orderPrice: any;
  totalPriceSaved: any;
  createdAt: any;
}) => {
  const {
    discountCodeId,
    userId,
    billingContactInfoId,
    statusId,
    orderPrice,
    totalPriceSaved,
    createdAt,
  } = body;
  return {
    discountCodeId,
    userId,
    billingContactInfoId,
    statusId,
    orderPrice,
    totalPriceSaved,
    createdAt,
  };
};

export default router;
