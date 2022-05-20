import express from "express";
import { SubscriptionType } from "../../models/mysql/subscription-type";
import { GenericService } from "../../services/mysql/generic-model.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const subscriptionTypeService = new GenericService(SubscriptionType);

router.get("/", async (_, res) => {
  const result = await subscriptionTypeService.findAll();
  resultHandler("Subscription types", result, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await subscriptionTypeService.findOne(id);
  resultHandler("Subscription type", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await subscriptionTypeService.create(requestObject);
  resultHandler("Subscription type", result, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await subscriptionTypeService.update(id, requestObject);
  resultHandler("Subscription type", result, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await subscriptionTypeService.delete(id);
  resultHandler("Subscription type", result, res);
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
