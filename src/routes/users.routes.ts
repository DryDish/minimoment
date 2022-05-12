import express from "express";
import bcrypt from "bcrypt";

import { User } from "../models/mysql/user";
import { sendErrorResponse } from "../utils/responses.util";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const userList = await User.findAll();
    res.status(200).send(userList);
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve users.", 500, error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundUser = await User.findByPk(id);
    if (foundUser) {
      res.status(200).send(foundUser);
    } else {
      sendErrorResponse(res, "User not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve user.", 500, error);
  }
});

router.post("/", async (req, res) => {
  const requestObject = await filterBody(req.body);

  const user = User.build(requestObject);
  try {
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (error) {
    sendErrorResponse(res, "Unable to create user.", 500, error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = await filterBody(req.body);

  try {
    const userToEdit = await User.findByPk(id);
    if (userToEdit) {
      const updatedUser = await userToEdit.update(requestObject);
      res.status(200).send(updatedUser);
    } else {
      sendErrorResponse(res, "User not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to update user.", 500, error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const userToDelete = await User.findByPk(id);
    if (userToDelete) {
      await userToDelete.destroy();
      res.status(200).send(userToDelete);
    } else {
      sendErrorResponse(res, "User not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to delete user.", 500, error);
  }
});

const filterBody = async (body: {
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
  const hashedPassword = await bcrypt.hash(password, 10);

  return {
    firstName,
    lastName,
    username,
    password: hashedPassword,
    autoRenew,
    roleId,
    contactInfoId,
  };
};

export default router;
