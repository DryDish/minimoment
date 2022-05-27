import express from "express";
import { validateId } from "../../middleware/mongo-validators";
import { Order, OrderInterface } from "../../models/mongo/order";
import { Status, StatusInterface } from "../../models/mongo/status";
import { User, UserInterface } from "../../models/mongo/user";
import { GenericService } from "../../services/mongo/generic-model.service";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const orderService = new GenericService<OrderInterface>(Order);
const userService = new GenericService<UserInterface>(User);
const statusService = new GenericService<StatusInterface>(Status);

router.get("/", async (_, res) => {
  const result = await orderService.findAll();
  resultHandler("Orders", result, res);
});

router.get("/:id", validateId(), async (req, res) => {
  const { id } = req.params;

  const result = await orderService.findOne(id);
  resultHandler("Order", result, res);
});

// GET order(s) by user id
router.get("/by-user/:userId", validateId("userId"), async (req, res) => {
  const { userId } = req.params;

  const userResult = await userService.findOne(userId);

  const orderList: OrderInterface[] = [];
  if (userResult.status === StatusCode.Success) {
    const user = userResult.entity!;

    if (user.orderIds) {
      const orderIdList = user.orderIds;

      for (const orderId of orderIdList) {
        const orderResult = await orderService.findOne(orderId);

        if (orderResult.status === StatusCode.Success) {
          orderList.push(orderResult.entity!);
        }
      }
    }

    let result;

    if (orderList.length > 0) {
      result = new CustomResult(StatusCode.Success, orderList);
    } else {
      result = new CustomResult(StatusCode.NotFound);
    }
    resultHandler("Order by user id", result, res);
  } else {
    resultHandler("Order by user id", userResult, res);
  }
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const statusResult = await statusService.findOne(requestObject.statusId);

  if (statusResult.status === StatusCode.Success) {
    const status = statusResult.entity!;

    requestObject.status = status;
    const orderResult = await orderService.create(requestObject);
    resultHandler("Order", orderResult, res);
  } else {
    resultHandler("Status", statusResult, res);
  }
});

router.patch("/:id", validateId(), async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const statusResult = await statusService.findOne(requestObject.statusId);
  const orderResult = await orderService.findOne(id);
  console.log("status:", statusResult.status, " order:", orderResult.status);

  if (statusResult.status === 200 && orderResult.status === 200) {
    requestObject.status = statusResult.entity!;
    const orderUpdateResult = await orderService.update(id, requestObject);

    resultHandler("Order", orderUpdateResult, res);
  } else if (statusResult.status !== 200 && orderResult.status === 200) {
    resultHandler("Status", statusResult, res);
  } else if (statusResult.status === 200 && orderResult.status !== 200) {
    resultHandler("Order", orderResult, res);
  } else {
    resultHandler("Order and Status", statusResult, res);
  }
});

router.delete("/:id", validateId(), async (req, res) => {
  const { id } = req.params;

  const result = await orderService.delete(id);
  resultHandler("Order", result, res);
});

const filterBody = (body: {
  discountCodeId: any;
  userId: any;
  billingContactInfo: any;
  statusId: any;
  orderPrice: any;
  totalPriceSaved: any;
  createdAt: any;
  orderItems: any[];
  status: any;
}) => {
  const {
    discountCodeId,
    userId,
    billingContactInfo,
    statusId,
    orderPrice,
    totalPriceSaved,
    createdAt,
    orderItems,
    status,
  } = body;
  return {
    discountCodeId,
    userId,
    billingContactInfo,
    statusId,
    orderPrice,
    totalPriceSaved,
    createdAt,
    orderItems,
    status,
  };
};

export default router;
