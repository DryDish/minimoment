import { DataTypes, Model, Sequelize } from "sequelize";

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
        type: DataTypes.STRING(45),
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
