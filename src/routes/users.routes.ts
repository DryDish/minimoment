import express from "express";
import { sequelize } from "../services/sequelize.service";
import { User } from "../models/user";

const router = express.Router();
const users = sequelize.models.User;

// TODO: add try-catch in case of database errors

router.get("/", async (_, res) => {
  const result = await users.findAll();
  
  if (result) {
    res.send({ users: result });
  } else {
    res.status(404).send({ error: 404, message: "Users not found." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await users.findByPk(id);

  if (result) {
    res.send({ user: result });
  } else {
    res.status(404).send({ error: 404, message: "User not found." });
  }
});

router.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    password,
    autoRenew,
    roleId,
    contactInfoId,
  } = req.body;

  const user = User.build({
    firstName,
    lastName,
    username,
    password,
    autoRenew,
    roleId,
    contactInfoId,
  });

  const result = await user.save();

  res.status(201).send({ user: result });
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    username,
    password,
    autoRenew,
    roleId,
    contactInfoId,
  } = req.body;

  const userToEdit = await users.findByPk(id);

  if (userToEdit) {
    const result = await userToEdit.update({
      firstName,
      lastName,
      username,
      password,
      autoRenew,
      roleId,
      contactInfoId,
    });

    res.send({ user: result });
  } else {
    res.status(404).send({ error: 404, message: "User not found." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userToDelete = await users.findByPk(id);

  if (userToDelete) {
    await userToDelete.destroy();

    res.send({ message: "Success!" });
  } else {
    res.status(404).send({ error: 404, message: "User not found." });
  }
});

export default router;
