import express from "express";
import bcrypt from "bcrypt";
import { User } from "../../models/neo4j/user";
import { resultHandler } from "../../utils/response-handler.utils";
import { UserService } from "../../services/neo4j/user.service";

const router = express.Router();
const userService = new UserService(User);

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
  const requestObject = await filterBody(req.body);
  
  const result = await userService.create(requestObject);
  resultHandler("User", result, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = await filterBody(req.body);
  
  const result = await userService.update(id, requestObject);
  resultHandler("User", result, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await userService.delete(id);
  resultHandler("User", result, res);
});

const filterBody = async (body: {
  first_name: any;
  last_name: any;
  username: any;
  password: any;
  auto_renew: any;
  role_id: any;
  contact_info_id: any;
}) => {
  const {
    first_name,
    last_name,
    username,
    password,
    auto_renew,
    role_id,
    contact_info_id,
  } = body;
  const hashedPassword = await bcrypt.hash(password, 10);

  return {
    first_name,
    last_name,
    username,
    password: hashedPassword,
    auto_renew,
    role_id,
    contact_info_id,
  };
};

export default router;
