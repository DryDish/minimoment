import express from "express";
import { validateId } from "../../middleware/mongo-validators";
import { SubscriptionInterface } from "../../models/mongo/subscription";
import { User, UserInterface } from "../../models/mongo/user";
import { GenericService } from "../../services/mongo/generic-model.service";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const usersService = new GenericService<UserInterface>(User);

router.get("/", async (_, res) => {
  const usersResult = await usersService.findAll();

  if (usersResult.status === StatusCode.Success) {
    const result: (SubscriptionInterface & { userId: string })[] = [];

    usersResult.entity!.forEach((user) => {
      user.subscriptions?.forEach((subscription) => {
        const { endsAt, startsAt, subscriptionType } = subscription;
        result.push({ endsAt, startsAt, subscriptionType, userId: user._id });
      });
    });

    resultHandler(
      "Subscriptions",
      new CustomResult(StatusCode.Success, result),
      res
    );
  } else {
    resultHandler("Subscriptions", usersResult, res);
  }
});

router.get("/by-user/:userId", validateId, async (req, res) => {
  const { userId } = req.params;
  const userResult = await usersService.findOne(userId);

  if (userResult.status === StatusCode.Success) {
    const result = userResult.entity?.subscriptions;
    resultHandler(
      "Subscriptions",
      new CustomResult(StatusCode.Success, result),
      res
    );
  } else {
    resultHandler("Subscriptions", userResult, res);
  }
});

export default router;
