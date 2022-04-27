import express from "express";
import { DiscountType } from "../models/discount-type";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const discountTypeList = await DiscountType.findAll();
    res.status(200).send({ discountCodeTypes: discountTypeList });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: 500,
      message: "Unable to retrieve a list of discount codes.",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const discountType = await DiscountType.findByPk(id);
    if (discountType === null) {
      res.status(404).send({ error: 404, message: "Not found." });
    } else {
      res.status(200).send({ discountType: discountType });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: 500,
      message: "Unable to retrieve discount code.",
    });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const newDiscountType = DiscountType.build({ name });

  try {
    await newDiscountType.save();
    res.status(200).send({ discountType: newDiscountType });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: 500,
      message: "Unable to save new discount type.",
      description: "'name' must be either 'amount' or 'percent.'",
    });
  }
});

export default router;
