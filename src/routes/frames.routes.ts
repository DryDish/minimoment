import express from "express";
import { Frame } from "../models/frame";
import { sendErrorResponse } from "../utils/responses.util";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const frameList = await Frame.findAll();
    res.status(200).send(frameList);
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve frames.", 500, error);
  }
});

// GET by frame id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundFrame = await Frame.findByPk(id);
    if (foundFrame) {
      res.status(200).send(foundFrame);
    } else {
      sendErrorResponse(res, "Frame not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve frame.", 500, error);
  }
});

// POST create new frame
router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);
  const frame = Frame.build(requestObject);

  try {
    const savedFrame = await frame.save();
    res.status(201).send(savedFrame);
  } catch (error) {
    sendErrorResponse(res, "Unable to create frame.", 500, error);
  }
});

// PATCH update frame
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  try {
    const frameToEdit = await Frame.findByPk(id);
    if (frameToEdit) {
      const updatedFrame = await frameToEdit.update(requestObject);
      res.status(200).send(updatedFrame);
    } else {
      sendErrorResponse(res, "Frame not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to update frame.", 500, error);
  }
});

// DELETE frame
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const frameToDelete = await Frame.findByPk(id);
    if (frameToDelete) {
      await frameToDelete.destroy();
      res.status(200).send(frameToDelete);
    } else {
      sendErrorResponse(res, "Frame not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to delete frame.", 500, error);
  }
});

const filterBody = (body: {
  discountCodeId: any;
  name: any;
  multiplier: any;
  material: any;
  sizeId: any;
}) => {
  const { discountCodeId, name, multiplier, material, sizeId } = body;
  return { discountCodeId, name, multiplier, material, sizeId };
};

export default router;
