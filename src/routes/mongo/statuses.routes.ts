import express from "express";
import { validateId } from "../../middleware/mongo-validators";
import { Status, StatusInterface } from "../../models/mongo/status";
import { GenericService } from "../../services/mongo/generic-model.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const statusesService = new GenericService<StatusInterface>(Status);

router.get("/", async (_, res) => {
  const result = await statusesService.findAll();
  resultHandler("Statuses", result, res);
});

router.get("/:id", validateId(), async (req, res) => {
  const { id } = req.params;

  const result = await statusesService.findOne(id);
  resultHandler("Status", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await statusesService.create(requestObject);
  resultHandler("Status", result, res);
});

router.patch("/:id", validateId(), async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await statusesService.update(id, requestObject);
  resultHandler("Status", result, res);
});

router.delete("/:id", validateId(), async (req, res) => {
  const { id } = req.params;

  const result = await statusesService.delete(id);
  resultHandler("Status", result, res);
});

const filterBody = (body: { name: any }) => {
  const { name } = body;
  return { name };
};

export default router;
