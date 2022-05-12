import express from "express";
import { DiscountCode } from "../models/mysql/discount-code";
import { sendErrorResponse } from "../utils/responses.util";

export const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const discountCodeList = await DiscountCode.findAll();
    res.status(200).send(discountCodeList);
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve discount codes.", 500, error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundDiscountCode = await DiscountCode.findByPk(id);

    if (foundDiscountCode) {
      res.status(200).send(foundDiscountCode);
    } else {
      sendErrorResponse(res, "Discount code not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve discount code.", 500, error);
  }
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const discountCode = DiscountCode.build(requestObject);
  try {
    const savedDiscountCode = await discountCode.save();
    res.status(200).send(savedDiscountCode);
  } catch (error) {
    sendErrorResponse(res, "Unable to create discount code.", 500, error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  try {
    const discountCodeToEdit = await DiscountCode.findByPk(id);
    if (discountCodeToEdit) {
      const updatedDiscountCode = await discountCodeToEdit.update(
        requestObject
      );
      res.status(200).send(updatedDiscountCode);
    } else {
      sendErrorResponse(res, "Discount code not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to update discount code.", 500, error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const discountCodeToDelete = await DiscountCode.findByPk(id);
    if (discountCodeToDelete) {
      await discountCodeToDelete.destroy();
      res.status(200).send(discountCodeToDelete);
    } else {
      sendErrorResponse(res, "Discount code not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to delete discount code.", 500, error);
  }
});

const filterBody = (body: {
  name: any;
  value: any;
  validFrom: any;
  validTo: any;
  remainingUses: any;
  discountTypeId: any;
}) => {
  const { name, value, validFrom, validTo, remainingUses, discountTypeId } =
    body;
  return { name, value, validFrom, validTo, remainingUses, discountTypeId };
};

export default router;
