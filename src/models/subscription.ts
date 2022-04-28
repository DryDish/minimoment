import { DataTypes, Model, Sequelize } from "sequelize";
import { SubscriptionType } from "./subscription-type";
import { User } from "./user";

export class Subscription extends Model {}

export default (sequelize: Sequelize) => {
  Subscription.init(
    {
      subscriptionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "subscription_id",
      },
      startsAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "starts_at",
      },
      endsAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "ends_at",
      },
    },
    {
      sequelize,
      tableName: "subscriptions",
    }
  );
};

export const defineSubscriptionAssociations = () => {
  Subscription.belongsTo(User, {
    foreignKey: {
      name: "userId",
      allowNull: false,
      field: "user_id",
    },
  });
  Subscription.belongsTo(SubscriptionType, {
    foreignKey: {
      name: "subscriptionTypeId",
      allowNull: false,
      field: "subscription_type_id",
    },
  });
};
