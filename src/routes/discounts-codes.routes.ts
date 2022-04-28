import express from "express";
import { DiscountCode } from "../models/discount-code";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const discountCodes = await DiscountCode.findAll();

    res.status(200).json({ discountCodes: discountCodes });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: 500,
      message: "Unable to retrieve a list of discount codes.",
    });
  }
});

export default router;
