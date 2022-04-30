import express from "express";
import { DiscountCode } from "../models/discount-code";

export const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const discountCodes = await DiscountCode.findAll();

    res.status(200).json({ discountCodes });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: 500,
      message: "Unable to retrieve a list of discount codes.",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const discountCode = await DiscountCode.findByPk(id);

    if (discountCode === null) {
      res.status(404).send({ error: 404, message: "Not found." });
    } else {
      res.status(200).send({ discountCode });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: 500,
      message: "Unable to retrieve the discount code.",
    });
  }
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const discountCode = DiscountCode.build(requestObject);

  try {
    await discountCode.save();

    res.status(200).send({ discountCode });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      error: 500,
      message: "Unable to save new discount.",
    });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const discountCode = await DiscountCode.findByPk(id);
  if (!discountCode) {
    res.status(404).send({ error: 404, message: "Not found." });
    return;
  }

  try {
    await discountCode.update(requestObject);

    res.status(200).send({ discountCode });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      error: 500,
      message: "Unable to save new discount.",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const discountCode = await DiscountCode.findByPk(id);

  if (!discountCode) {
    res.status(404).send({ error: 404, message: "Not found." });
    return;
  }

  try {
    await discountCode.destroy();
    res.status(200).send({ deleted: discountCode });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: 500,
      message: "Unable to delete the discount type.",
    });
  }
});

const filterBody = (body: {
  name: any;
  value: any;
  validFrom: any;
  validTo: any;
  remainingUses: any;
  discountCodeId: any;
}) => {
  const { name, value, validFrom, validTo, remainingUses, discountCodeId } =
    body;

  return {
    name,
    value,
    validFrom,
    validTo,
    remainingUses,
    discountCodeId,
  };
};

export default router;
