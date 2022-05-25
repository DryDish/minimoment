import express from "express";
import { validateId } from "../../middleware/mongo-validators";
import { SubscriptionType, SubscriptionTypeInterface} from "../../models/mongo/subscription-type";
import { GenericService } from "../../services/mongo/generic-model.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const subscriptionTypeService = new GenericService<SubscriptionTypeInterface>(
  SubscriptionType
);

router.get("/", async (_, res) => {
  const result = await subscriptionTypeService.findAll();
  resultHandler("Subscription types", result, res);
});

router.get("/:id", validateId(), async (req, res) => {
  const { id } = req.params;

  const result = await subscriptionTypeService.findOne(id);
  resultHandler("Subscription type", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await subscriptionTypeService.create(requestObject);
  resultHandler("Subscription type", result, res);
});

router.patch("/:id", validateId(), async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await subscriptionTypeService.update(id, requestObject);
  resultHandler("Subscription type", result, res);
});

router.delete("/:id", validateId(), async (req, res) => {
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
