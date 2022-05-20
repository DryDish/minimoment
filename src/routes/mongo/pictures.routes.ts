import express from "express";
import { validateId } from "../../middleware/mongo-validators";
import { PictureData } from "../../models/mongo/picture-data";
import { User } from "../../models/mongo/user";
import { GenericService } from "../../services/mongo/generic-model.service";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const pictureDataService = new GenericService(PictureData);
const userService = new GenericService(User);

router.get("/:id", validateId, async (req, res) => {
  const { id } = req.params;

  const result = await pictureDataService.findOne(id);
  resultHandler("Pictures", result, res);
});

router.get("/by-user/:userId", validateId, async (req, res) => {
  const { userId } = req.params;

  const result = await userService.findOne(userId);

  const message = "Pictures by user id";

  switch (result.status) {
    case StatusCode.Success:
      const userPictures = result.entity!.pictureData!;
      return resultHandler(message, new CustomResult(StatusCode.Success, userPictures), res);
    case StatusCode.NotFound:
      return resultHandler(message, result, res);
    default:
      return resultHandler(message, result, res);
  }
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await pictureDataService.create(requestObject);
  resultHandler("Picture", result, res);
});

router.patch("/:id", validateId, async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await pictureDataService.update(id, requestObject);
  resultHandler("Picture", result, res);
});

router.delete("/:id", validateId, async (req, res) => {
  const { id } = req.params;

  const result = await pictureDataService.delete(id);
  resultHandler("Picture", result, res);
});

const filterBody = (body: { userId: any; imageUrl: any; uploadedAt: any }) => {
  const { userId, imageUrl, uploadedAt } = body;
  return { userId, imageUrl, uploadedAt };
};

export default router;
