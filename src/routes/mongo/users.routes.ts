import express from "express";
import bcrypt from "bcrypt";
import { validateId } from "../../middleware/mongo-validators";
import {
  PictureData,
  PictureDataInterface,
} from "../../models/mongo/picture-data";
import { Role, RoleInterface } from "../../models/mongo/role";
import { User, UserInterface } from "../../models/mongo/user";
import { GenericService } from "../../services/mongo/generic-model.service";
import { StatusCode } from "../../utils/custom-result.utils";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const userService = new GenericService<UserInterface>(User);
const roleService = new GenericService<RoleInterface>(Role);
const pictureDataService = new GenericService<PictureDataInterface>(
  PictureData
);

router.get("/", async (_, res) => {
  const result = await userService.findAll();
  resultHandler("Frames", result, res);
});

router.get("/:id", validateId(), async (req, res) => {
  const { id } = req.params;

  const result = await userService.findOne(id);
  resultHandler("Frame", result, res);
});

router.post("/", async (req, res) => {
  const requestObject = await filterBody(req.body);

  const roleResult = await roleService.findOne(requestObject.roleId);
  if (roleResult.status !== StatusCode.Success) {
    resultHandler("Role", roleResult, res);
    return;
  }

  const pictureDataToNest: PictureDataInterface[] = [];
  for (const pictureDataId of requestObject.pictureDataIds) {
    const pictureDataResult = await pictureDataService.findOne(pictureDataId);
    if (pictureDataResult.status === StatusCode.Success) {
      pictureDataToNest.push(pictureDataResult.entity!);
    } else {
      resultHandler("Picture Data", pictureDataResult, res);
      return;
    }
  }

  const userObject: UserInterface = {
    autoRenew: requestObject.autoRenew,
    firstName: requestObject.firstName,
    lastName: requestObject.lastName,
    password: requestObject.password,
    username: requestObject.username,
    contactInfo: requestObject.contactInfo,
    role: roleResult.entity,
    orderIds: requestObject.orderIds,
    pictureData: pictureDataToNest,
    subscriptions: requestObject.subscriptions,
  };

  const result = await userService.create(userObject);
  resultHandler("Frame", result, res);
});

router.patch("/:id", validateId(), async (req, res) => {
  const { id } = req.params;
  const requestObject = await filterBody(req.body);

  const roleResult = await roleService.findOne(requestObject.roleId);
  if (roleResult.status !== StatusCode.Success) {
    resultHandler("Role", roleResult, res);
    return;
  }

  const pictureDataToNest: PictureDataInterface[] = [];
  for (const pictureDataId of requestObject.pictureDataIds) {
    const pictureDataResult = await pictureDataService.findOne(pictureDataId);
    if (pictureDataResult.status === StatusCode.Success) {
      pictureDataToNest.push(pictureDataResult.entity!);
    } else {
      resultHandler("Picture Data", pictureDataResult, res);
      return;
    }
  }

  const userObject: UserInterface = {
    autoRenew: requestObject.autoRenew,
    firstName: requestObject.firstName,
    lastName: requestObject.lastName,
    password: requestObject.password,
    username: requestObject.username,
    contactInfo: requestObject.contactInfo,
    role: roleResult.entity,
    orderIds: requestObject.orderIds,
    pictureData: pictureDataToNest,
    subscriptions: requestObject.subscriptions,
  };


  const result = await userService.update(id, userObject);
  resultHandler("Frame", result, res);
});

router.delete("/:id", validateId(), async (req, res) => {
  const { id } = req.params;

  const result = await userService.delete(id);
  resultHandler("Frame", result, res);
});

const filterBody = async (body: {
  firstName: any;
  lastName: any;
  username: any;
  password: any;
  autoRenew: any;
  roleId: any;
  subscriptions: any;
  pictureDataIds: any;
  contactInfo: any;
  orderIds: any;
}) => {
  const {
    autoRenew,
    contactInfo,
    firstName,
    lastName,
    orderIds,
    password,
    roleId,
    subscriptions,
    pictureDataIds,
    username,
  } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  return {
    autoRenew,
    contactInfo,
    firstName,
    lastName,
    orderIds,
    password: hashedPassword,
    roleId,
    subscriptions,
    pictureDataIds,
    username,
  };
};

export default router;
