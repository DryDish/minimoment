import { DataTypes, Model, Sequelize } from "sequelize";
import { DiscountType } from "./discount-type";
import { Frame } from "./frame";
import { Order } from "./order";
import { PaperType } from "./paper-type";

export class DiscountCode extends Model {}

export default (sequelize: Sequelize) => {
  DiscountCode.init(
    {
      discountCodeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "discount_code_id",
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        field: "name",
      },
      value: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        field: "value",
      },
      validFrom: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "valid_from",
      },
      validTo: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "valid_to",
      },
      remainingUses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "remaining_uses",
      },
    },
    {
      sequelize,
      tableName: "discount_codes",
    }
  );
};

export const defineDiscountCodeAssociation = () => {
  DiscountCode.belongsTo(DiscountType, {
    foreignKey: {
      name: "discountTypeId",
      allowNull: false,
      field: "discount_type_id",
    },
  });
  DiscountCode.hasMany(Order, {
    foreignKey: {
      name: "discountCodeId",
      allowNull: true,
      field: "discount_code_id",
    },
  });
  DiscountCode.hasMany(Frame, {
    foreignKey: {
      name: "discountCodeId",
      allowNull: true,
      field: "discount_code_id",
    },
  });
  DiscountCode.hasMany(PaperType, {
    foreignKey: {
      name: "discountCodeId",
      allowNull: true,
      field: "discount_code_id",
    },
  });
};
