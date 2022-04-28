import { Sequelize } from "sequelize";

// Import Models
import RoleModel, { defineRoleAssociations } from "../models/role";
import DiscountTypeModel from "../models/discount-type";
import ContactInfoModel, {
  defineContactInfoAssociations,
} from "../models/contact-info";
import UserModel, { defineUserAssociations } from "../models/user";
import StatusModel from "../models/status";

// Constants
const HOST = process.env.MYSQL_DB_HOST || "localhost";
const USER = process.env.MYSQL_DB_USER || "";
const PASSWORD = process.env.MYSQL_DB_PASSWORD || "";
const SCHEMA = process.env.MYSQL_DB_SCHEMA || "";

// Create Sequelize connection
export const sequelize = new Sequelize(SCHEMA, USER, PASSWORD, {
  host: HOST,
  dialect: "mysql",
  define: {
    timestamps: false,
  },
  logging: console.log,
});

// Define all Models
UserModel(sequelize);
RoleModel(sequelize);
DiscountTypeModel(sequelize);
ContactInfoModel(sequelize);
StatusModel(sequelize);

// Define all Associations
defineRoleAssociations();
defineContactInfoAssociations();
defineUserAssociations();

// Authenticate to the Database
export const authenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `Connected to the database at: ${HOST}/${SCHEMA} with user: ${USER}.`
    );
  } catch (error) {
    console.error(
      `Unable to connect to the database at: ${HOST}/${SCHEMA} with user: ${USER}.`,
      error
    );
  }
};
