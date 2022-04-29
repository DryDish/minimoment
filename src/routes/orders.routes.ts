import express from "express";
import { Order } from "../models/order";
import { sendErrorResponse } from "../utils/responses.util";

const router = express.Router();

// GET all Order
router.get("/", async (_, res) => {
  try {
    const result = await Order.findAll();
    res.status(200).send(result);
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve orders.", 500, error);
  }
});

// GET by order id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Order.findByPk(id);
    if (result) {
      res.status(200).send(result);
    } else {
      sendErrorResponse(res, "Order not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve order.", 500, error);
  }
});

// GET order(s) by user id
router.get("/by-user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await Order.findAll({
      where: { userId },
    });
    res.send(result);
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve user orders.", 500, error);
  }
});

// POST create new order
router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);
  console.log(requestObject);

  const order = Order.build(requestObject);

  try {
    const result = await order.save();
    res.status(201).send(result);
  } catch (error) {
    sendErrorResponse(res, "Unable to create order.", 500, error);
  }
});

// PATCH update order
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  try {
    const orderToEdit = await Order.findByPk(id);
    if (orderToEdit) {
      const updatedOrder = await orderToEdit.update(requestObject);
      res.status(200).send(updatedOrder);
    } else {
      sendErrorResponse(res, "Order not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to update order.", 500, error);
  }
});

// DELETE order
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const orderToDelete = await Order.findByPk(id);
    if (orderToDelete) {
      await orderToDelete.destroy();
      res.status(200).send(orderToDelete);
    } else {
      sendErrorResponse(res, "Order not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to delete order.", 500, error);
  }
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
