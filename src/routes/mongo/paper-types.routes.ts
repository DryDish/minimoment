import express from "express";
import { validateId } from "../../middleware/mongo-validators";
import { PaperType, PaperTypeInterface } from "../../models/mongo/paper-type";
import { GenericService } from "../../services/mongo/generic-model.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const paperTypesService = new GenericService<PaperTypeInterface>(PaperType);

router.get("/", async (_, res) => {
  const result = await paperTypesService.findAll();
  resultHandler("Paper Types", result, res);
});

router.get("/:id", validateId(), async (req, res) => {
  const { id } = req.params;

  const result = await paperTypesService.findOne(id);
  resultHandler("Paper Type", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await paperTypesService.create(requestObject);
  resultHandler("Paper Type", result, res);
});

router.patch("/:id", validateId(), async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await paperTypesService.update(id, requestObject);
  resultHandler("Paper Type", result, res);
});

router.delete("/:id", validateId(), async (req, res) => {
  const { id } = req.params;

  const result = await paperTypesService.delete(id);
  resultHandler("Paper Type", result, res);
});

const filterBody = (body: {
  name: any;
  discountCodeId: any;
  multiplier: any;
  size: any;
}) => {
  const { name, discountCodeId, multiplier, size } = body;
  return { name, discountCodeId, multiplier, size };
};

export default router;
