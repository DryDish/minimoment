import express from "express";
import { SubscriptionType } from "../models/mysql/subscription-type";
import { sendErrorResponse } from "../utils/responses.util";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const subscriptionTypeList = await SubscriptionType.findAll();
    res.status(200).send(subscriptionTypeList);
  } catch (error) {
    sendErrorResponse(
      res,
      "Unable to retrieve subscription types.",
      500,
      error
    );
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundSubscriptionType = await SubscriptionType.findByPk(id);
    if (foundSubscriptionType) {
      res.status(200).send(foundSubscriptionType);
    } else {
      sendErrorResponse(res, "Subscription Type not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve subscription type.", 500, error);
  }
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const subscriptionType = SubscriptionType.build(requestObject);

  try {
    const savedSubscriptionType = await subscriptionType.save();
    res.status(201).send(savedSubscriptionType);
  } catch (error) {
    sendErrorResponse(res, "Unable to create subscription type.", 500, error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  try {
    const subscriptionTypeToEdit = await SubscriptionType.findByPk(id);
    if (subscriptionTypeToEdit) {
      const updatedSubscriptionType = await subscriptionTypeToEdit.update(
        requestObject
      );
      res.status(200).send(updatedSubscriptionType);
    } else {
      sendErrorResponse(res, "Subscription Type not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to update subscription type.", 500, error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const subscriptionTypeToDelete = await SubscriptionType.findByPk(id);

    if (subscriptionTypeToDelete) {
      await subscriptionTypeToDelete.destroy();
      res.status(200).send(subscriptionTypeToDelete);
    } else {
      sendErrorResponse(res, "Subscription Type not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to delete subscription type.", 500, error);
  }
});

const filterBody = (body: {
  name: any;
  monthlyPrice: any;
  imageAmount: any;
}) => {
  const { name, monthlyPrice, imageAmount } = body;
  return { name, monthlyPrice, imageAmount };
};

export default router;
