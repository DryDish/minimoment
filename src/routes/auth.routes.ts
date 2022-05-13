import express, { Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/mysql/user";
import { Role } from "../models/mysql/role";
import { resultHandler } from "../utils/response-handler.utils";
import { CustomResult, StatusCode } from "../utils/custom-result.utils";

// Constants
const SECRET_KEY = process.env.AUTH_SECRET_KEY || "";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await getUser(res, username);
  if (!user) {
    resultHandler("", new CustomResult(StatusCode.Unauthorized), res);
    return;
  }

  bcrypt.compare(password, user.getDataValue("password"), (error, same) => {
    if (error || !same) {
      resultHandler("", new CustomResult(StatusCode.Unauthorized), res);
      return;
    }

    jwt.sign(
      { user: username },
      SECRET_KEY,
      { expiresIn: "24h" },
      (e: Error | null, token: string | undefined) => {
        if (e) {
          resultHandler("", new CustomResult(StatusCode.ServerError), res);
        } else {
          const result = new CustomResult(StatusCode.Success, {
            user: { username },
            token,
          });
          resultHandler("", result, res);
        }
      }
    );
  });
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await getUser(res, username);
  if (user) {
    resultHandler("", new CustomResult(StatusCode.ServerError), res);
    return;
  }

  const role = await getRole(res, "user");
  if (!role) {
    resultHandler("", new CustomResult(StatusCode.ServerError), res);
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
    resultHandler("", new CustomResult(StatusCode.ServerError), res);
  }
});

const getUser = async (
  _res: Response,
  username: string
): Promise<User | null> => {
  try {
    return await User.findOne({ where: { username } });
  } catch (error) {
    return null;
  }
};

const getRole = async (_res: Response, role: string): Promise<Role | null> => {
  try {
    return await Role.findOne({ where: { name: role } });
  } catch (error) {
    return null;
  }
};

export default router;
