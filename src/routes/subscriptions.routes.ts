import express from "express";
import { sequelize } from "../services/sequelize.service";
import { Subscription } from "../models/subscription";

const router = express.Router();
const subscriptions = sequelize.models.Subscription;

// TODO: add try-catch in case of database errors

router.get("/", async (_, res) => {
  const result = await subscriptions.findAll();

  res.send({ subscriptions: result });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await subscriptions.findByPk(id);

  if (result) {
    res.send({ subscription: result });
  } else {
    res.status(404).send({ error: 404, message: "Subscription not found." });
  }
});

router.post("/", async (req, res) => {
  const { userId, subscriptionTypeId, startsAt, endsAt } = req.body;

  const subscription = Subscription.build({
    userId,
    subscriptionTypeId,
    startsAt,
    endsAt,
  });

  const result = await subscription.save();

  res.status(201).send({ subscription: result });
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId, subscriptionTypeId, startsAt, endsAt } = req.body;

  const subscriptionToEdit = await subscriptions.findByPk(id);

  if (subscriptionToEdit) {
    const result = await subscriptionToEdit.update({
      userId,
      subscriptionTypeId,
      startsAt,
      endsAt,
    });

    res.send({ subscription: result });
  } else {
    res
      .status(404)
      .send({ error: 404, message: "Subscription not found." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const subscriptionToDelete = await subscriptions.findByPk(id);

  if (subscriptionToDelete) {
    await subscriptionToDelete.destroy();

    res.send({ message: "Success!" });
  } else {
    res.status(404).send({ error: 404, message: "Subscription not found." });
  }
});

export default router;
