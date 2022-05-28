import express from "express";
import { Subscription } from "../../models/neo4j/subscription";
import { SubscriptionService } from "../../services/neo4j/subscription.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const subscriptionService = new SubscriptionService(Subscription);

router.get("/", async (_, res) => {
  const result = await subscriptionService.findAll();
  resultHandler("Subscriptions", result, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await subscriptionService.findOne(id);
  resultHandler("Subscription", result, res);
});

// GET order(s) by user id
router.get("/by-user/:userId", async (req, res) => {
  const { userId } = req.params;

  const result = await subscriptionService.findByUserId(userId);
  resultHandler("Subscriptions by user id", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await subscriptionService.create(requestObject);
  resultHandler("Subscription", result, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await subscriptionService.update(id, requestObject);
  resultHandler("Subscription", result, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await subscriptionService.delete(id);
  resultHandler("Subscription", result, res);
});

const filterBody = (body: {
  user_id: any;
  subscription_type_id: any;
  starts_at: any;
  ends_at: any;
}) => {
  const { user_id, subscription_type_id, starts_at, ends_at } = body;
  return { user_id, subscription_type_id, starts_at, ends_at };
};

export default router;
