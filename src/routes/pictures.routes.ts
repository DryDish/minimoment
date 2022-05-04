import express from "express";
import { PictureData } from "../models/picture-data";
import { sendErrorResponse } from "../utils/responses.util";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundPictureData = await PictureData.findByPk(id);
    if (foundPictureData) {
      res.status(200).send(foundPictureData);
    } else {
      sendErrorResponse(res, "Picture data not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve picture data.", 500, error);
  }
});

router.get("/by-user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const pictureDataList = await PictureData.findAll({
      where: { userId },
    });
    res.status(200).send(pictureDataList);
  } catch (error) {
    sendErrorResponse(
      res,
      "Unable to retrieve picture data by user.",
      500,
      error
    );
  }
});

router.post("/", async (req, res) => {
  const requestBody = filterBody(req.body);

  const pictureData = PictureData.build(requestBody);
  try {
    const savedPictureData = await pictureData.save();
    res.status(201).send(savedPictureData);
  } catch (error) {
    sendErrorResponse(res, "Unable to save picture data.", 500, error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestBody = filterBody(req.body);

  try {
    const pictureDataToEdit = await PictureData.findByPk(id);
    if (pictureDataToEdit) {
      const updatedPictureData = await pictureDataToEdit.update(requestBody);
      res.status(200).send(updatedPictureData);
    } else {
      sendErrorResponse(res, "Picture data not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to update picture data.", 500, error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pictureToDelete = await PictureData.findByPk(id);

    if (pictureToDelete) {
      await pictureToDelete.destroy();
      res.status(200).send(pictureToDelete);
    } else {
      sendErrorResponse(res, "Picture data not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to delete picture data.", 500, error);
  }
});

const filterBody = (body: { userId: any; imageUrl: any; uploadedAt: any }) => {
  const { userId, imageUrl, uploadedAt } = body;
  return { userId, imageUrl, uploadedAt };
};

export default router;
