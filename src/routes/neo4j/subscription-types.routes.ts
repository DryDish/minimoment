import express from "express";
import { SubscriptionType } from "../../models/neo4j/subscription-type";
import { GenericService } from "../../services/neo4j/generic-model.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const subscriptionTypeRouter = new GenericService(SubscriptionType);

router.get("/", async (_, res) => {
  const result = await subscriptionTypeRouter.findAll();
  resultHandler("Subscription Types", result, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await subscriptionTypeRouter.findOne(id);
  resultHandler("Subscription Type", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await subscriptionTypeRouter.create(requestObject);
  resultHandler("Subscription Type", result, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await subscriptionTypeRouter.update(id, requestObject);
  resultHandler("Subscription Type", result, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await subscriptionTypeRouter.delete(id);
  resultHandler("Subscription Type", result, res);
});

const filterBody = (body: {
  name: any;
  monthly_price: any;
  image_amount: any;
}) => {
  const { name, monthly_price, image_amount } = body;
  return { name, monthly_price, image_amount };
};

export default router;
