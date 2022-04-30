import express from "express";
import { User } from "../models/user";
import { sendErrorResponse } from "../utils/responses.util";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const userList = await User.findAll();
    res.status(200).send(userList);
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve user accounts.", 500, error);
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
    sendErrorResponse(res, "Unable to retrieve user accounts.", 500, error);
  }
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const newUser = User.build(requestObject);
  try {
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve user accounts.", 500, error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  try {
    const userToEdit = await User.findByPk(id);
    if (userToEdit) {
      const updatedUser = await userToEdit.update(requestObject);
      res.status(200).send(updatedUser);
    } else {
      sendErrorResponse(res, "User not found.", 404);
    }
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve user accounts.", 500, error);
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
    sendErrorResponse(res, "Unable to retrieve user accounts.", 500, error);
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
