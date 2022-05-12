import express from "express";
import { PaperType } from "../models/mysql/paper-type";
import { sendErrorResponse } from "../utils/responses.util";

const router = express.Router();

// GET all paper_types
router.get("/", async (_, res) => {
  try {
    const paperTypeList = await PaperType.findAll();
    res.send(paperTypeList);
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve paper types.", 500, error);
  }
});

// GET paper_type by paper_type_id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundPaperType = await PaperType.findByPk(id);
    if (foundPaperType) {
      res.status(200).send(foundPaperType);
    } else {
      sendErrorResponse(res, "Paper type not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve paper type.", 500, error);
  }
});

// POST create a new paper_type
router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);
  const paperType = PaperType.build(requestObject);

  try {
    const savedPaperType = await paperType.save();
    res.status(201).send(savedPaperType);
  } catch (error) {
    sendErrorResponse(res, "Unable to create paper type.", 500, error);
  }
});

// PATCH update paper_type by paper_type_id
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  try {
    const paperTypeToEdit = await PaperType.findByPk(id);
    if (paperTypeToEdit) {
      const updatedPaperType = await paperTypeToEdit.update(requestObject);
      res.status(201).send(updatedPaperType);
    } else {
      sendErrorResponse(res, "Paper type not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to update paper type.", 500, error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const paperTypeToDelete = await PaperType.findByPk(id);

    if (paperTypeToDelete) {
      await paperTypeToDelete.destroy();

      res.status(200).send(paperTypeToDelete);
    } else {
      sendErrorResponse(res, "Paper type not found.", 404);
    }
  } catch (error) {

    sendErrorResponse(res, "Unable to delete paper type.", 500, error);
  }
});

const filterBody = (body: {
  name: any;
  multiplier: any;
  sizeId: any;
  discountCodeId: any;
}) => {
  const { name, multiplier, sizeId, discountCodeId } = body;
  return { name, multiplier, sizeId, discountCodeId };
};

export default router;
