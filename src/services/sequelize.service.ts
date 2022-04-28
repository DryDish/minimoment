import { Sequelize } from "sequelize";

// Import Models
import RoleModel, { defineRoleAssociations } from "../models/role";
import DiscountTypeModel from "../models/discount-type";
import DiscountCodeModel, { defineDiscountCodeAssociation } from "../models/discount-code";
import ContactInfoModel, {
  defineContactInfoAssociations,
} from "../models/contact-info";
import UserModel, { defineUserAssociations } from "../models/user";
import OrderModel, { defineOrderAssociations } from "../models/order";
import OrderItemModel, { defineOrderItemAssociations } from "../models/order-item";
import InvoiceModel, { defineInvoiceAssociations } from "../models/invoice";
import PaperTypeModel, { definePaperTypeAssociations } from "../models/paper-type";
import PictureDataModel, { definePictureDataAssociations } from "../models/picture-data";
import FrameModel, { defineFrameAssociations } from "../models/frame";
import StatusModel from "../models/status";
import SubscriptionTypeModel, { defineSubscriptionTypesAssociations } from "../models/subscription-type";
import SubscriptionModel, { defineSubscriptionAssociations } from "../models/subscription";
import SizeModel from "../models/size";
import MonthlyReportModel from "../models/monthly-report";

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
DiscountCodeModel(sequelize);
ContactInfoModel(sequelize);
StatusModel(sequelize);
SubscriptionTypeModel(sequelize);
SubscriptionModel(sequelize);
OrderModel(sequelize);
OrderItemModel(sequelize);
InvoiceModel(sequelize);
PaperTypeModel(sequelize);
PictureDataModel(sequelize);
FrameModel(sequelize);
SizeModel(sequelize);
MonthlyReportModel(sequelize);

// Define all Associations
defineRoleAssociations();
defineContactInfoAssociations();
defineUserAssociations();
defineSubscriptionTypesAssociations();
defineSubscriptionAssociations();
defineDiscountCodeAssociation();
defineOrderAssociations();
defineOrderItemAssociations();
defineInvoiceAssociations();
definePaperTypeAssociations();
definePictureDataAssociations();
defineFrameAssociations();

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
