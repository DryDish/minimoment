import express from "express";
import { sequelize } from "../services/sequelize.service";
import { Size } from "../models/size";

const router = express.Router();
const sizes = sequelize.models.Size;

// TODO: add try-catch in case of database errors

router.get("/", async (_, res) => {
  const result = await sizes.findAll();

  res.send({ sizes: result });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await sizes.findByPk(id);

  if (result) {
    res.send({ size: result });
  } else {
    res.status(404).send({ error: 404, message: "Size not found." });
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    widthMm,
    heightMm,
    price,
  } = req.body;

  const size = Size.build({
    name,
    widthMm,
    heightMm,
    price,
  });

  const result = await size.save();

  res.status(201).send({ size: result });
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    widthMm,
    heightMm,
    price,
  } = req.body;

  const sizeToEdit = await sizes.findByPk(id);

  if (sizeToEdit) {
    const result = await sizeToEdit.update({
        name,
        widthMm,
        heightMm,
        price,
    });

    res.send({ size: result });
  } else {
    res.status(404).send({ error: 404, message: "Size not found." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const sizeToDelete = await sizes.findByPk(id);

  if (sizeToDelete) {
    await sizeToDelete.destroy();

    res.send({ message: "Success!" });
  } else {
    res.status(404).send({ error: 404, message: "Size not found." });
  }
});

export default router;
