import express from "express";
import { DiscountType } from "../models/discount-type";

const router = express.Router();

router.get("/codes", (_, res) => {
  // TODO - Make Discounts return all its data
  const discountCodes = ["temp", "data"];
  res.status(200).json({ discountCodes: discountCodes });
});

router.get("/types", async (_, res) => {
  try {
    const discountTypeList = await DiscountType.findAll();
    return res.status(200).send({ discountCodeTypes: discountTypeList });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error: 500,
      message: "Unable to retrieve a list of discount codes.",
    });
  }
});

export default router;
