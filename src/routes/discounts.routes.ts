import express from "express";

const router = express.Router();

router.get("/code", (_, res) => {
  // TODO - Make Discounts return all its data
  const discountCodes = ["temp", "data"];
  res.status(200).json({ discount_codes: discountCodes });
});

export default router;
