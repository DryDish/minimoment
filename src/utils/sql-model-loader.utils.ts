// Import Models
import { Sequelize } from "sequelize/types";
import ContactInfoModel, { defineContactInfoAssociations } from "../models/mysql/contact-info";
import DiscountCodeModel, { defineDiscountCodeAssociation } from "../models/mysql/discount-code";
import DiscountTypeModel, { defineDiscountTypeAssociations } from "../models/mysql/discount-type";
import FrameModel, { defineFrameAssociations } from "../models/mysql/frame";
import InvoiceModel, { defineInvoiceAssociations } from "../models/mysql/invoice";
import OrderModel, { defineOrderAssociations } from "../models/mysql/order";
import OrderItemModel, { defineOrderItemAssociations } from "../models/mysql/order-item";
import PaperTypeModel, { definePaperTypeAssociations } from "../models/mysql/paper-type";
import PictureDataModel, { definePictureDataAssociations } from "../models/mysql/picture-data";
import RoleModel, { defineRoleAssociations } from "../models/mysql/role";
import SizeModel, { defineSizeAssociations } from "../models/mysql/size";
import StatusModel, { defineStatusAssociations } from "../models/mysql/status";
import SubscriptionModel, { defineSubscriptionAssociations } from "../models/mysql/subscription";
import SubscriptionTypeModel, { defineSubscriptionTypesAssociations } from "../models/mysql/subscription-type";
import UserModel, { defineUserAssociations } from "../models/mysql/user";
import MonthlyReportModel from "../models/mysql/monthly-report";

/**
 * Simple function to call, in the right order, all the models that
 * sequelize needs.
 *
 * @param sequelize - An initialized sequelize instance
 */
const loadDbModels = (sequelize: Sequelize) => {
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
  defineStatusAssociations();
  defineDiscountTypeAssociations();
  defineSizeAssociations();
};

export default loadDbModels;
