import mongoose, { Model, Types } from "mongoose";
import { Role, RoleInterface } from "../models/mongo/role";
import { SubscriptionType, SubscriptionTypeInterface } from "../models/mongo/subscription-type";
import { GenericService } from "../services/mongo/generic-model.service";

// Constants
const HOST = process.env.MONGO_DB_HOST || "localhost";
const USER = process.env.MONGO_DB_USER || "";
const PASSWORD = process.env.MONGO_DB_PASSWORD || "";
const DATABASE = process.env.MONGO_DB_DATABASE || "";
const AUTH_DATABASE = process.env.MONGO_DB_AUTH_DATABASE || "";

// Connect to the db
mongoose.connect(
  `mongodb://${USER}:${PASSWORD}@${HOST}:27017/${DATABASE}?authSource=${AUTH_DATABASE}`
);

// *** HIGHLY VOLATILE ENVIRONMENT ***
(async () => {
  const roleTests = async () => {
    const roleService = new GenericService<RoleInterface>(Role);

    const allRoles = await roleService.findAll();
    console.log("All roles: ", allRoles);

    const createdRole = await roleService.create({ name: "new name" });
    console.log("Created Role: ", createdRole);

    const updateStatus = await roleService.update(createdRole.entity!._id, {name: "updated name"});
    console.log("Update status code:", updateStatus.status);

    const newlyUpdatedRole = await roleService.findOne(createdRole.entity!._id);
    console.log("Updated Role: ", newlyUpdatedRole);

    const deleteResult = await roleService.delete(createdRole.entity!._id);
    console.log("Delete status code: ", deleteResult.status);
  };

  const subscriptionTypesTests = async () => {
    const subscriptionTypesService = new GenericService<SubscriptionTypeInterface>(SubscriptionType);

    const allx = await subscriptionTypesService.findAll();
    console.log("All Subscription types: ", allx);

    const createdx = await subscriptionTypesService.create({name: "yo mama", monthlyPrice: 12, imageAmount: 12});
    console.log("Created Subscription type:", createdx);

    const updatedStatus = await subscriptionTypesService.update(createdx.entity!._id, {name: "My mom", monthlyPrice: 12, imageAmount: 666});
    console.log("Update status code:", updatedStatus.status);

    const newlyUpdatedSubscriptionType = await subscriptionTypesService.findOne(createdx.entity!._id);
    console.log("Updated Role: ", newlyUpdatedSubscriptionType);

    const deleteResult = await subscriptionTypesService.delete(newlyUpdatedSubscriptionType.entity!._id);
    console.log("Delete status code: ", deleteResult.status);
  };

  (async() => {
    await roleTests();
    await subscriptionTypesTests();
  })();

  

})();
// ***********************************
