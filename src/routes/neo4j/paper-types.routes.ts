import express from "express";
import { PaperType } from "../../models/neo4j/paper-type";
import { PaperTypeService } from "../../services/neo4j/paper-type.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const paperTypeService = new PaperTypeService(PaperType);

router.get("/", async (_, res) => {
  const result = await paperTypeService.findAll();
  resultHandler("Paper types", result, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await paperTypeService.findOne(id);
  resultHandler("Paper type", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await paperTypeService.create(requestObject);
  resultHandler("Paper type", result, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await paperTypeService.update(id, requestObject);
  resultHandler("Paper type", result, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await paperTypeService.delete(id);
  resultHandler("Paper type", result, res);
});

const filterBody = (body: {
  name: any;
  multiplier: any;
  size_id: any;
  discount_code_id: any;
}) => {
  const { name, multiplier, size_id, discount_code_id } = body;
  return { name, multiplier, size_id, discount_code_id };
};

export default router;
