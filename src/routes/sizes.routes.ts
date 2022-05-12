import express from "express";
import { Size } from "../models/mysql/size";
import { sendErrorResponse } from "../utils/responses.utils";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const sizeList = await Size.findAll();
    res.status(200).send(sizeList);
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve sizes.", 500, error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundSize = await Size.findByPk(id);
    if (foundSize) {
      res.status(200).send(foundSize);
    } else {
      sendErrorResponse(res, "Size not found", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve sizes.", 500, error);
  }
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);
  const size = Size.build(requestObject);

  try {
    const savedSize = await size.save();
    res.status(201).send(savedSize);
  } catch (error) {
    sendErrorResponse(res, "Unable to create size.", 500, error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  try {
    const sizeToEdit = await Size.findByPk(id);
    if (sizeToEdit) {
      const updatedSize = await sizeToEdit.update(requestObject);
      res.status(200).send(updatedSize);
    } else {
      sendErrorResponse(res, "Size not found", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to update size.", 500, error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const sizeToDelete = await Size.findByPk(id);
    if (sizeToDelete) {
      await sizeToDelete.destroy();
      res.status(200).send(sizeToDelete);
    } else {
      sendErrorResponse(res, "Size not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to delete size.");
  }
});

const filterBody = (body: {
  name: any;
  widthMm: any;
  heightMm: any;
  price: any;
}) => {
  const { name, widthMm, heightMm, price } = body;
  return { name, widthMm, heightMm, price };
};

export default router;
