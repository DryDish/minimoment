import express from "express";
import { sequelize } from "../services/sequelize.service";
import { Role } from "../models/role";

const router = express.Router();
const roles = sequelize.models.Role;

// TODO: add try-catch in case of database errors

router.get("/", async (_, res) => {
  const result = await roles.findAll();

  res.send({ roles: result });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await roles.findByPk(id);

  if (result) {
    res.send({ role: result });
  } else {
    res.status(404).send("Role not found.");
  }
});

router.post("/", async (req, res) => {
  const role = Role.build({ name: req.body.name });

  const result = await role.save();

  res.status(201).send({ role: result });
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const roleToEdit = await roles.findByPk(id);

  if (roleToEdit) {
    const result = await roleToEdit.update({
      name: req.body.name,
    });

    res.send({ role: result });
  } else {
    res.status(404).send("Role not found.");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const roleToDelete = await roles.findByPk(id);

  if (roleToDelete) {
    await roleToDelete.destroy();

    res.send({ message: "Success" });
  } else {
    res.status(404).send("Role not found.");
  }
});

export default router;
