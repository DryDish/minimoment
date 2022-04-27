import { DataTypes, Model, Sequelize } from "sequelize";

export class DiscountType extends Model {}

export default (sequelize: Sequelize) => {
  DiscountType.init(
    {
      discount_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: "discount_types",
    }
  );
};
