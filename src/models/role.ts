import { DataTypes, Model, Sequelize } from "sequelize";

export class Role extends Model {}

export default (sequelize: Sequelize) => {
  Role.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "role_id",
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
      tableName: "roles",
    }
  );
};
