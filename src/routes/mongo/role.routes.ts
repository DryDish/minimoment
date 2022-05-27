import express from "express";
import { validateId } from "../../middleware/mongo-validators";
import { Role, RoleInterface } from "../../models/mongo/role";
import { GenericService } from "../../services/mongo/generic-model.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const rolesService = new GenericService<RoleInterface>(Role);

router.get("/", async (_, res) => {
  const result = await rolesService.findAll();
  resultHandler("Roles", result, res);
});

router.get("/:id", validateId(), async (req, res) => {
  const { id } = req.params;

  const result = await rolesService.findOne(id);
  resultHandler("Role", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await rolesService.create(requestObject);
  resultHandler("Role", result, res);
});

router.patch("/:id", validateId(), async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await rolesService.update(id, requestObject);
  resultHandler("Role", result, res);
});

router.delete("/:id", validateId(), async (req, res) => {
  const { id } = req.params;

  const result = await rolesService.delete(id);
  resultHandler("Role", result, res);
});

const filterBody = (body: { name: any }) => {
  const { name } = body;
  return { name };
};

export default router;
