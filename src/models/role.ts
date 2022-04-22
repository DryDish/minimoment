import { DataTypes, Model, Sequelize } from "sequelize";

class Role extends Model {}

export default (sequelize: Sequelize) =>
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
      tableName: "roles",
      createdAt: false,
      updatedAt: false
    }
  );
