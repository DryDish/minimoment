import express from "express";
import { Role } from "../models/mysql/role";
import { sendErrorResponse } from "../utils/responses.util";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const roleList = await Role.findAll();
    res.status(200).send(roleList);
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve roles.", 500, error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundRole = await Role.findByPk(id);
    if (foundRole) {
      res.status(200).send(foundRole);
    } else {
      sendErrorResponse(res, "Role not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve role.", 500, error);
  }
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const role = Role.build(requestObject);
  try {
    const savedRole = await role.save();
    res.status(201).send(savedRole);
  } catch (error) {
    sendErrorResponse(res, "Unable to create role.", 500, error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  try {
    const roleToEdit = await Role.findByPk(id);
    if (roleToEdit) {
      const updatedRole = await roleToEdit.update(requestObject);
      res.status(200).send(updatedRole);
    } else {
      sendErrorResponse(res, "Role not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to update role.", 500, error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const roleToDelete = await Role.findByPk(id);
    if (roleToDelete) {
      await roleToDelete.destroy();
      res.status(200).send(roleToDelete);
    } else {
      sendErrorResponse(res, "Role not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to delete role.", 500, error);
  }
});

const filterBody = (body: { name: any }) => {
  const { name } = body;
  return { name };
};

export default router;
