import express from "express";
import { Order } from "../models/order";
import { OrderItem } from "../models/order-item";
import { sendErrorResponse } from "../utils/responses.util";

const router = express.Router();

// GET single order_item by order_item_id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundOrderItem = await OrderItem.findByPk(id);
    if (foundOrderItem) {
      res.status(200).send(foundOrderItem);
    } else {
      sendErrorResponse(res, "Order item not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve order item.", 500, error);
  }
});

// GET a list of order_items by order_id
router.get("/by-order/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderItemList = await OrderItem.findAll({
      where: { orderId },
    });
    res.status(200).send(orderItemList);
  } catch (error) {
    sendErrorResponse(
      res,
      "Unable to retrieve order items by order id.",
      500,
      error
    );
  }
});

// GET a list of order_items by user_id
router.get("/by-user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const orderList = await Order.findAll({ where: { userId } });
    const orderItemList: OrderItem[] = [];

    for (const order of orderList) {
      orderItemList.push(
        ...(await OrderItem.findAll({
          where: { orderId: order.getDataValue("orderId") },
        }))
      );
    }
    res.status(200).send(orderItemList);
  } catch (error) {
    sendErrorResponse(
      res,
      "Unable to retrieve order items by user id.",
      500,
      error
    );
  }
});

// POST create an order_item
router.post("/", async (req, res) => {
  const requestBody = filterBody(req.body);

  const orderItem = OrderItem.build(requestBody);
  try {
    const savedOrderItem = await orderItem.save();
    res.status(201).send(savedOrderItem);
  } catch (error) {
    sendErrorResponse(res, "Unable to save order item.", 500, error);
  }
});

// PATCH update an order_item
router.patch("/:order_item_id", async (req, res) => {
  const { order_item_id } = req.params;
  const requestBody = filterBody(req.body);

  try {
    const orderItemToEdit = await OrderItem.findByPk(order_item_id);
    if (orderItemToEdit) {
      const updatedOrderItem = await orderItemToEdit.update(requestBody);
      res.status(200).send(updatedOrderItem);
    } else {
      sendErrorResponse(res, "Order item not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to update order item.", 500, error);
  }
});

// DELETE an order_item
router.delete("/:order_item_id", async (req, res) => {
  const { order_item_id } = req.params;

  try {
    const orderItemToDelete = await OrderItem.findByPk(order_item_id);

    if (orderItemToDelete) {
      await orderItemToDelete.destroy();
      res.status(200).send(orderItemToDelete);
    } else {
      sendErrorResponse(res, "Order item not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to delete order item.", 500, error);
  }
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
