import express from "express";
import { sequelize } from "../services/sequelize.service";
import { User } from "../models/user";

const router = express.Router();
const users = sequelize.models.User;

router.get("/", async (_, res) => {
  try {
    const result = await users.findAll();

    res.status(200).send(result);
  } catch (error) {
    console.error(error);

    res.status(500).send({
      error: 500,
      message: "Unable to retrieve user accounts.",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await users.findByPk(id);

    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ error: 404, message: "User not found." });
    }
  } catch (error) {
    console.error(error);

    res.status(500).send({
      error: 500,
      message: "Unable to retrieve user account.",
    });
  }
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const user = User.build(requestObject);

  try {
    const result = await user.save();

    res.status(201).send(result);
  } catch (error) {
    console.error(error);

    res.status(500).send({
      error: 500,
      message: "Unable to create user account.",
    });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  try {
    const userToEdit = await users.findByPk(id);

    if (userToEdit) {
      const result = await userToEdit.update(requestObject);

      res.status(201).send(result);
    } else {
      res.status(404).send({ error: 404, message: "User not found." });
    }
  } catch (error) {
    console.error(error);

    res.status(500).send({
      error: 500,
      message: "Unable to update user account.",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const userToDelete = await users.findByPk(id);

    if (userToDelete) {
      await userToDelete.destroy();

      res.status(201).send({ message: "Success!" });
    } else {
      res.status(404).send({ error: 404, message: "User not found." });
    }
  } catch (error) {
    console.error(error);

    res.status(500).send({
      error: 500,
      message: "Unable to delete user account.",
    });
  }
});

const filterBody = (body: {
  firstName: any;
  lastName: any;
  username: any;
  password: any;
  autoRenew: any;
  roleId: any;
  contactInfoId: any;
}) => {
  const {
    firstName,
    lastName,
    username,
    password,
    autoRenew,
    roleId,
    contactInfoId,
  } = body;

  return {
    firstName,
    lastName,
    username,
    password,
    autoRenew,
    roleId,
    contactInfoId,
  };
};

export default router;
