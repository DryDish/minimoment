import express from "express";
import { DiscountType } from "../models/discount-type";
import { sendErrorResponse } from "../utils/responses.util";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const discountTypeList = await DiscountType.findAll();
    res.status(200).send(discountTypeList);
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve discount types.", 500, error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundDiscountType = await DiscountType.findByPk(id);
    if (foundDiscountType) {
      res.status(200).send(foundDiscountType);
    } else {
      sendErrorResponse(res, "Discount type not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve discount type.", 500, error);
  }
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const discountType = DiscountType.build(requestObject);
  try {
    const savedDiscountType = await discountType.save();
    res.status(201).send(savedDiscountType);
  } catch (error) {
    sendErrorResponse(res, "Unable to create discount type.", 500, error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  try {
    const discountTypeToEdit = await DiscountType.findByPk(id);
    if (discountTypeToEdit) {
      const updatedDiscountType = await discountTypeToEdit.update(
        requestObject
      );
      res.status(200).send(updatedDiscountType);
    } else {
      sendErrorResponse(res, "Discount type not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to edit discount type.", 500, error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const discountTypeToDelete = await DiscountType.findByPk(id);
    if (discountTypeToDelete) {
      await discountTypeToDelete.destroy();
      res.status(200).send(discountTypeToDelete);
    } else {
      sendErrorResponse(res, "Discount type not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to delete discount type.", 500, error);
  }
});

const filterBody = (body: { name: any }) => {
  const { name } = body;
  return { name };
};

export default router;
