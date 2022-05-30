import express from "express";
import { PictureData } from "../../models/neo4j/picture-data";
import { PictureDataService } from "../../services/neo4j/picture-data.service";
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

const filterBody = (body: {
  user_id: any;
  image_url: any;
  uploaded_at: any;
}) => {
  const { user_id, image_url, uploaded_at } = body;
  return { user_id, image_url, uploaded_at };
};

export default router;
