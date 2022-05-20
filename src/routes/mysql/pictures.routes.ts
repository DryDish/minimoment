import express from "express";
import { PictureData } from "../../models/mysql/picture-data";
import { PictureDataService } from "../../services/mysql/picture-data.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const pictureDataService = new PictureDataService(PictureData);

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await pictureDataService.findOne(id);
  resultHandler("Pictures", result, res);
});

router.get("/by-user/:userId", async (req, res) => {
  const { userId } = req.params;

  const result = await pictureDataService.findByUserId(userId);
  resultHandler("Pictures by user id", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await pictureDataService.create(requestObject);
  resultHandler("Picture", result, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await pictureDataService.update(id, requestObject);
  resultHandler("Picture", result, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await pictureDataService.delete(id);
  resultHandler("Picture", result, res);
});

const filterBody = (body: { userId: any; imageUrl: any; uploadedAt: any }) => {
  const { userId, imageUrl, uploadedAt } = body;
  return { userId, imageUrl, uploadedAt };
};

export default router;
