import express from "express";
import { sequelize } from "../services/sequelize.service";
import { Role } from "../models/role";

const router = express.Router();
const roles = sequelize.models.Role;

// TODO: add try-catch in case of database errors

router.get("/", async (req, res) => {
  const result = await roles.findAll();

  res.send({ roles: result });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
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

export default router;
