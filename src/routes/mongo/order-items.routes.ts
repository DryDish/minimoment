import express, { Response } from "express";
import { resultHandler } from "../../utils/response-handler.utils";
import { GenericService } from "../../services/mongo/generic-model.service";
import { User, UserInterface } from "../../models/mongo/user";
import { Order, OrderInterface } from "../../models/mongo/order";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { OrderItem, OrderItemInterface } from "../../models/mongo/order-item";
import { validateId } from "../../middleware/mongo-validators";

const userService = new GenericService<UserInterface>(User);
const orderService = new GenericService<OrderInterface>(Order);
const orderItemService = new GenericService<OrderItemInterface>(OrderItem);

const router = express.Router();

router.get(
  "/by-order/:orderId",
  validateId("orderId"),
  async (req, res: Response) => {
    const { orderId } = req.params;
    const orderResult = await orderService.findOne(orderId);

    let orderItemList: OrderItemInterface[] = [];
    if (orderResult.status === StatusCode.Success) {
      const orderList = orderResult.entity!;
      orderItemList = orderList.orderItems || [];
      resultHandler(
        "Order items by order id",
        new CustomResult(StatusCode.Success, orderItemList),
        res
      );
    } else {
      resultHandler("Order items by order id", orderResult, res);
    }
  }
);

router.get("/by-user/:userId", validateId("userId"), async (req, res) => {
  const { userId } = req.params;

  const userResult = await userService.findOne(userId);

  // user ->  orderIds[] -> order -> orderItems[] -> orderItem

  if (userResult.status === StatusCode.Success) {
    const user = userResult.entity!;

    const orderIdList = user.orderIds;
    const orderItemList: OrderItemInterface[] = [];

    if (orderIdList) {
      for (const orderId of orderIdList) {
        const orderResult = await orderService.findOne(orderId);

        if (orderResult.status === StatusCode.Success) {
          const order = orderResult.entity!;

          if (order.orderItems) {
            orderItemList.push(...order.orderItems);
          }
        }
      }
    }

    let response;

    if (orderItemList.length > 0) {
      response = new CustomResult(StatusCode.Success, {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
        },
        orderItems: orderItemList,
      });
    } else {
      response = new CustomResult(StatusCode.NotFound);
    }

    resultHandler("Order items by user id", response, res);
  } else {
    resultHandler("Order item by user id", userResult, res);
  }
});

export default router;
