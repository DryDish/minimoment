import express from "express";
import { Order } from "../../models/neo4j/order";
import { OrderService } from "../../services/neo4j/order.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const orderService = new OrderService(Order);

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
  discount_code_id: any;
  user_id: any;
  billing_contact_info_id: any;
  status_id: any;
  order_price: any;
  total_price_saved: any;
  created_at: any;
}) => {
  const {
    discount_code_id,
    user_id,
    billing_contact_info_id,
    status_id,
    order_price,
    total_price_saved,
    created_at,
  } = body;
  return {
    discount_code_id,
    user_id,
    billing_contact_info_id,
    status_id,
    order_price,
    total_price_saved,
    created_at,
  };
};

export default router;
