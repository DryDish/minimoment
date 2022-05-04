import express, { Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { sendErrorResponse } from "../utils/responses.util";
import { Role } from "../models/role";

// Constants
const SECRET_KEY = process.env.AUTH_SECRET_KEY || "";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await getUser(res, username);
  if (!user) {
    sendErrorResponse(res, "Unauthorized.", 401);
    return;
  }

  bcrypt.compare(password, user.getDataValue("password"), (error, same) => {
    if (error || !same) {
      sendErrorResponse(res, "Unauthorized.", 401);
      return;
    }

    jwt.sign(
      { user: username },
      SECRET_KEY,
      { expiresIn: "24h" },
      (e: Error | null, token: string | undefined) => {
        if (e) {
          sendErrorResponse(res, "Internal server error.", 500, e);
        } else
          res.status(200).send({
            user: { username },
            token,
          });
      }
    );
  });
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await getUser(res, username);
  if (user) {
    sendErrorResponse(res, "Internal server error.", 500);
    return;
  }

  const role = await getRole(res, "user");
  if (!role) {
    sendErrorResponse(res, "Internal server error.", 500);
    return;
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  const userToRegister = User.build({
    username,
    password: encryptedPassword,
    roleId: role.getDataValue("roleId"),
  });
  try {
    const registeredUser = await userToRegister.save();
    res.status(201).send(registeredUser);
  } catch (error) {
    sendErrorResponse(res, "Internal server error.", 500, error);
  }
});

const getUser = async (
  res: Response,
  username: string
): Promise<User | null> => {
  try {
    return await User.findOne({ where: { username } });
  } catch (error) {
    sendErrorResponse(res, "Internal server error.", 500, error);
    return null;
  }
};

const getRole = async (res: Response, role: string): Promise<Role | null> => {
  try {
    return await Role.findOne({ where: { name: role } });
  } catch (error) {
    sendErrorResponse(res, "Internal server error.", 500, error);
    return null;
  }
};

export default router;
