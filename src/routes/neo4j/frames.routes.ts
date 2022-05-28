import express from "express";
import { Frame } from "../../models/neo4j/frame";
import { GenericService } from "../../services/neo4j/generic-model.service";
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
  discount_code_id: any;
  name: any;
  multiplier: any;
  material: any;
  size_id: any;
}) => {
  const { discount_code_id, name, multiplier, material, size_id } = body;
  return { discount_code_id, name, multiplier, material, size_id };
};

export default router;
