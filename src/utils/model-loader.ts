// Import Models
import RoleModel, { defineRoleAssociations } from "../models/role";
import DiscountTypeModel, {
  defineDiscountTypeAssociations,
} from "../models/discount-type";
import DiscountCodeModel, {
  defineDiscountCodeAssociation,
} from "../models/discount-code";
import ContactInfoModel, {
  defineContactInfoAssociations,
} from "../models/contact-info";
import UserModel, { defineUserAssociations } from "../models/user";
import OrderModel, { defineOrderAssociations } from "../models/order";
import OrderItemModel, {
  defineOrderItemAssociations,
} from "../models/order-item";
import InvoiceModel, { defineInvoiceAssociations } from "../models/invoice";
import PaperTypeModel, {
  definePaperTypeAssociations,
} from "../models/paper-type";
import PictureDataModel, {
  definePictureDataAssociations,
} from "../models/picture-data";
import FrameModel, { defineFrameAssociations } from "../models/frame";
import StatusModel, { defineStatusAssociations } from "../models/status";
import SubscriptionTypeModel, {
  defineSubscriptionTypesAssociations,
} from "../models/subscription-type";
import SubscriptionModel, {
  defineSubscriptionAssociations,
} from "../models/subscription";
import SizeModel, { defineSizeAssociations } from "../models/size";
import MonthlyReportModel from "../models/monthly-report";

import { Sequelize } from "sequelize/types";
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
