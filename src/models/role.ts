import { DataTypes, Model } from "sequelize";
import { sequelize } from "../services/sequelize.service";

class Role extends Model {}

Role.init(
  {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "Roles"
  }
);
