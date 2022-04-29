import { DataTypes, Model, Sequelize } from "sequelize";
import { ContactInfo } from "./contact-info";
import { Order } from "./order";
import { PictureData } from "./picture-data";
import { Role } from "./role";
import { Subscription } from "./subscription";

export class User extends Model {}

export default (sequelize: Sequelize) => {
  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "user_id",
      },
      firstName: {
        type: DataTypes.STRING(60),
        allowNull: true,
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING(60),
        allowNull: true,
        field: "last_name",
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "username",
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "password",
      },
      autoRenew: {
        type: DataTypes.TINYINT({ length: 1 }),
        allowNull: true,
        field: "auto_renew",
      },
    },
    {
      sequelize,
      tableName: "users",
    }
  );
};

export const defineUserAssociations = () => {
  User.belongsTo(Role, {
    foreignKey: {
      name: "roleId",
      allowNull: false,
      field: "role_id",
    },
  });
  User.belongsTo(ContactInfo, {
    foreignKey: {
      name: "contactInfoId",
      allowNull: true,
      field: "contact_info_id",
    },
  });
  User.hasMany(Subscription, {
    foreignKey: {
      name: "userId",
      allowNull: false,
      field: "user_id",
    },
  });
  User.hasMany(PictureData, {
    foreignKey: {
      name: "userId",
      allowNull: false,
      field: "user_id",
    },
  });
  User.hasMany(Order, {
    foreignKey: {
      name: "userId",
      allowNull: false,
      field: "user_id",
    },
  });
};
