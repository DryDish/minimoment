import express from "express";
import { sequelize } from "../services/sequelize.service";
import { Status } from "../models/status";

const router = express.Router();
const statuses = sequelize.models.Status;

// TODO: add try-catch in case of database errors

router.get("/", async (_, res) => {
  const result = await statuses.findAll();

  res.send({ statuses: result });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await statuses.findByPk(id);

  if (result) {
    res.send({ status: result });
  } else {
    res.status(404).send({ error: 404, message: "Status not found." });
  }
});

router.post("/", async (req, res) => {
  const status = Status.build({ name: req.body.name });

  const result = await status.save();

  res.status(201).send({ status: result });
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const statusToEdit = await statuses.findByPk(id);

  if (statusToEdit) {
    const result = await statusToEdit.update({
      name: req.body.name,
    });

    res.send({ status: result });
  } else {
    res.status(404).send({ error: 404, message: "Status not found." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const statusToDelete = await statuses.findByPk(id);

  if (statusToDelete) {
    await statusToDelete.destroy();

    res.send({ message: "Success!" });
  } else {
    res.status(404).send({ error: 404, message: "Status not found." });
  }
});

export default router;
