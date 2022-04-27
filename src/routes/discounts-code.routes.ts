import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
  // TODO - Make Discounts return all its data
  const discountCodes = ["temp", "data"];
  res.status(200).json({ discountCodes: discountCodes });
});

export default router;
