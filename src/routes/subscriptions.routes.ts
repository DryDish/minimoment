import express from "express";
import { Subscription } from "../models/mysql/subscription";
import { sendErrorResponse } from "../utils/responses.utils";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const subscriptionList = await Subscription.findAll();
    res.status(200).send(subscriptionList);
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve subscriptions.", 500, error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundSubscription = await Subscription.findByPk(id);
    if (foundSubscription) {
      res.status(200).send(foundSubscription);
    } else {
      res.status(404).send({ error: 404, message: "Subscription not found." });
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve subscription.", 500, error);
  }
});

router.get("/by-user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const subscriptionList = await Subscription.findAll({ where: { userId } });
    res.status(200).send(subscriptionList);
  } catch (error) {
    sendErrorResponse(
      res,
      "Unable to retrieve subscriptions by user id.",
      500,
      error
    );
  }
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const subscription = Subscription.build(requestObject);
  try {
    const savedSubscription = await subscription.save();
    res.status(201).send(savedSubscription);
  } catch (error) {
    sendErrorResponse(res, "Unable to create subscription.", 500, error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  try {
    const subscriptionToEdit = await Subscription.findByPk(id);
    if (subscriptionToEdit) {
      const updatedSubscription = await subscriptionToEdit.update(
        requestObject
      );
      res.status(200).send(updatedSubscription);
    } else {
      sendErrorResponse(res, "Subscription not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to update subscription.", 500, error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const subscriptionToDelete = await Subscription.findByPk(id);
    if (subscriptionToDelete) {
      await subscriptionToDelete.destroy();
      res.status(200).send(subscriptionToDelete);
    } else {
      sendErrorResponse(res, "Subscription not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to delete subscription.", 500, error);
  }
});

const filterBody = (body: {
  userId: any;
  subscriptionTypeId: any;
  startsAt: any;
  endsAt: any;
}) => {
  const { userId, subscriptionTypeId, startsAt, endsAt } = body;
  return { userId, subscriptionTypeId, startsAt, endsAt };
};

export default router;
