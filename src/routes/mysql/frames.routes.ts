import express from "express";
import { Frame } from "../../models/mysql/frame";
import { GenericService } from "../../services/mysql/generic-model.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const FrameService = new GenericService(Frame);

router.get("/", async (_, res) => {
  const result = await FrameService.findAll();
  resultHandler("Frames", result, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await FrameService.findOne(id);
  resultHandler("Frame", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await FrameService.create(requestObject);
  resultHandler("Frame", result, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await FrameService.update(id, requestObject);
  resultHandler("Frame", result, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await FrameService.delete(id);
  resultHandler("Frame", result, res);
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
