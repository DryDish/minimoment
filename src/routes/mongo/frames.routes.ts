import express from "express";
import { validateId } from "../../middleware/mongo-validators";
import { Frame, FrameInterface } from "../../models/mongo/frame";
import { GenericService } from "../../services/mongo/generic-model.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const frameService = new GenericService<FrameInterface>(Frame);

router.get("/", async (_, res) => {
  const result = await frameService.findAll();
  resultHandler("Frames", result, res);
});

router.get("/:id", validateId, async (req, res) => {
  const { id } = req.params;

  const result = await frameService.findOne(id);
  resultHandler("Frame", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await frameService.create(requestObject);
  resultHandler("Frame", result, res);
});

router.patch("/:id", validateId, async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await frameService.update(id, requestObject);
  resultHandler("Frame", result, res);
});

router.delete("/:id", validateId, async (req, res) => {
  const { id } = req.params;

  const result = await frameService.delete(id);
  resultHandler("Frame", result, res);
});

const filterBody = (body: {
  name: any;
  discountCodeId: any;
  material: any;
  multiplier: any;
  size: any;
}) => {
  const { name, discountCodeId, multiplier, size, material } = body;
  return { name, discountCodeId, multiplier, size, material };
};

export default router;
