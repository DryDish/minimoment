import express from "express";
import { Status } from "../../models/mysql/status";
import { GenericService } from "../../services/mysql/generic-model.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const statusService = new GenericService(Status);

router.get("/", async (_, res) => {
  const result = await statusService.findAll();
  resultHandler("Statuses", result, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await statusService.findOne(id);
  resultHandler("Status", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await statusService.create(requestObject);
  resultHandler("Status", result, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await statusService.update(id, requestObject);
  resultHandler("Status", result, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await statusService.delete(id);
  resultHandler("Status", result, res);
});

const filterBody = (body: { name: any }) => {
  const { name } = body;
  return { name };
};

export default router;
