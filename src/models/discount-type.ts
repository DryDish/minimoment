import { DataTypes, Model, Sequelize } from "sequelize";
import { DiscountCode } from "./discount-code";

export class DiscountType extends Model {}

export default (sequelize: Sequelize) => {
  DiscountType.init(
    {
      discountTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "discount_type_id",
      },
      name: {
        type: DataTypes.ENUM("percent", "amount"),
        allowNull: false,
        unique: true,
        field: "name",
      },
    },
    {
      sequelize,
      tableName: "discount_types",
    }
  );
};

export const defineDiscountTypeAssociations = () => {
  DiscountType.hasMany(DiscountCode, {
    foreignKey: {
      name: "discountTypeId",
      allowNull: false,
      field: "discount_type_id",
    },
  });
};
