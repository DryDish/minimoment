import express from "express";
import { OrderItem } from "../models/mysql/order-item";
import { OrderItemService } from "../services/mysql/order-item.service";
import { resultHandler } from "../utils/response-handler.utils";

const router = express.Router();
const orderItemService = new OrderItemService(OrderItem);

router.get("/", async (_, res) => {
  const result = await orderItemService.findAll();
  resultHandler("Order items", result, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await orderItemService.findOne(id);
  resultHandler("Order item", result, res);
});

// GET a list of order_items by order_id
router.get("/by-order/:orderId", async (req, res) => {
  const { orderId } = req.params;

  const result = await orderItemService.findByOrderId(orderId);
  resultHandler("Order item by order id", result, res);
});

// GET a list of order_items by user_id
router.get("/by-user/:userId", async (req, res) => {
  const { userId } = req.params;

  const result = await orderItemService.findByUserId(userId);
  resultHandler("Order item by user id", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await orderItemService.create(requestObject);
  resultHandler("Order item", result, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await orderItemService.update(id, requestObject);
  resultHandler("Order item", result, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await orderItemService.delete(id);
  resultHandler("Order item", result, res);
});

const filterBody = (body: {
  pictureDataId: any;
  paperTypeId: any;
  frameId: any;
  orderId: any;
  orderItemPrice: any;
  priceSaved: any;
  amount: any;
}) => {
  const {
    pictureDataId,
    paperTypeId,
    frameId,
    orderId,
    orderItemPrice,
    priceSaved,
    amount,
  } = body;
  return {
    pictureDataId,
    paperTypeId,
    frameId,
    orderId,
    orderItemPrice,
    priceSaved,
    amount,
  };
};

export default router;
