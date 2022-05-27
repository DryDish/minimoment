import express from "express";
import bcrypt from "bcrypt";
import { User } from "../../models/mysql/user";
import { GenericService } from "../../services/mysql/generic-model.service";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const userService = new GenericService(User);

router.get("/", async (_, res) => {
  const result = await userService.findAll();
  resultHandler("Users", result, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await userService.findOne(id);
  resultHandler("User", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);

  const result = await userService.create(requestObject);
  resultHandler("User", result, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const result = await userService.update(id, requestObject);
  resultHandler("User", result, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await userService.delete(id);
  resultHandler("User", result, res);
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
