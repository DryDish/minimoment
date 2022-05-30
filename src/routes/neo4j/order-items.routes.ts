import express from "express";
import { OrderItem } from "../../models/neo4j/order-item";
import { OrderItemService } from "../../services/neo4j/order-item.service";
import { resultHandler } from "../../utils/response-handler.utils";

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
  picture_data_id: any;
  paper_type_id: any;
  frame_id: any;
  order_id: any;
  order_item_price: any;
  price_saved: any;
  amount: any;
}) => {
  const {
    picture_data_id,
    paper_type_id,
    frame_id,
    order_id,
    order_item_price,
    price_saved,
    amount,
  } = body;
  return {
    picture_data_id,
    paper_type_id,
    frame_id,
    order_id,
    order_item_price,
    price_saved,
    amount,
  };
};

export default router;
