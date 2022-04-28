import { DataTypes, Model, Sequelize } from "sequelize";

export class SubscriptionType extends Model {}

export default (sequelize: Sequelize) => {
  SubscriptionType.init(
    {
      subscriptionTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "subscription_type_id",
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        field: "name",
      },
      monthlyPrice: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        field: "monthly_price",
      },
      imageAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "image_amount",
      },
    },
    {
      sequelize,
      tableName: "subscription_types",
    }
  );
};
