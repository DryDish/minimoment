import { DataTypes, Model, Sequelize } from "sequelize";
import { ContactInfo } from "./contact-info";
import { DiscountCode } from "./discount-code";
import { Invoice } from "./invoice";
import { OrderItem } from "./order-item";
import { Status } from "./status";
import { User } from "./user";

export class Order extends Model {}

export default (sequelize: Sequelize) => {
  Order.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "order_id",
      },
      orderPrice: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
        field: "order_price",
      },
      totalPriceSaved: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0,
        field: "total_price_saved",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
    },
    {
      sequelize,
      tableName: "orders",
    }
  );
};

export const defineOrderAssociations = () => {
  Order.belongsTo(DiscountCode, {
    foreignKey: {
      name: "discountCodeId",
      allowNull: true,
      field: "discount_code_id",
    },
  });
  Order.belongsTo(User, {
    foreignKey: {
      name: "userId",
      allowNull: false,
      field: "user_id",
    },
  });
  Order.belongsTo(ContactInfo, {
    foreignKey: {
      name: "billingContactInfoId",
      allowNull: false,
      field: "billing_contact_info_id",
    },
  });
  Order.belongsTo(Status, {
    foreignKey: {
      name: "statusId",
      allowNull: false,
      field: "status_id",
    },
  });
  Order.hasMany(Invoice, {
    foreignKey: {
      name: "orderId",
      allowNull: false,
      field: "order_id",
    },
  });
  Order.hasMany(OrderItem, {
    foreignKey: {
      name: "orderId",
      allowNull: false,
      field: "order_id",
    },
  });
};
