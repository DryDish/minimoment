import express from "express";
import { Status } from "../models/mysql/status";
import { sendErrorResponse } from "../utils/responses.util";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const statusList = await Status.findAll();
    res.status(200).send(statusList);
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve statuses.", 500, error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundStatus = await Status.findByPk(id);
    if (foundStatus) {
      res.status(200).send(foundStatus);
    } else {
      sendErrorResponse(res, "Status not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve status.", 500, error);
  }
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const status = Status.build(requestObject);
  try {
    const savedUser = await status.save();
    res.status(201).send(savedUser);
  } catch (error) {
    sendErrorResponse(res, "Unable to create status.", 500, error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  try {
    const statusToEdit = await Status.findByPk(id);
    if (statusToEdit) {
      const updatedStatus = await statusToEdit.update(requestObject);
      res.status(200).send(updatedStatus);
    } else {
      sendErrorResponse(res, "Status not found", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to update status.", 500, error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const statusToDelete = await Status.findByPk(id);
    if (statusToDelete) {
      await statusToDelete.destroy();
      res.status(200).send(statusToDelete);
    } else {
      sendErrorResponse(res, "Status not found", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to delete status.", 500, error);
  }
});

const filterBody = (body: { name: any }) => {
  const { name } = body;
  return { name };
};

export default router;
