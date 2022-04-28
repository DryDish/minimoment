import express from "express";
import { sequelize } from "../services/sequelize.service";
import { SubscriptionType } from "../models/subscription-type";

const router = express.Router();
const subscriptionTypes = sequelize.models.SubscriptionType;

// TODO: add try-catch in case of database errors

router.get("/", async (_, res) => {
  const result = await subscriptionTypes.findAll();

  res.send({ subscriptionTypes: result });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await subscriptionTypes.findByPk(id);

  if (result) {
    res.send({ subscriptionType: result });
  } else {
    res
      .status(404)
      .send({ error: 404, message: "Subscription Type not found." });
  }
});

router.post("/", async (req, res) => {
  const { name, monthlyPrice, imageAmount } = req.body;

  const subscriptionType = SubscriptionType.build({
    name,
    monthlyPrice,
    imageAmount,
  });

  const result = await subscriptionType.save();

  res.status(201).send({ subscriptionType: result });
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, monthlyPrice, imageAmount } = req.body;

  const subscriptionTypeToEdit = await subscriptionTypes.findByPk(id);

  if (subscriptionTypeToEdit) {
    const result = await subscriptionTypeToEdit.update({
      name,
      monthlyPrice,
      imageAmount,
    });

    res.send({ subscriptionType: result });
  } else {
    res
      .status(404)
      .send({ error: 404, message: "Subscription Type not found." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const subscriptionTypeToDelete = await subscriptionTypes.findByPk(id);

  if (subscriptionTypeToDelete) {
    await subscriptionTypeToDelete.destroy();

    res.send({ message: "Success!" });
  } else {
    res.status(404).send({ error: 404, message: "Subscription Type not found." });
  }
});

export default router;
