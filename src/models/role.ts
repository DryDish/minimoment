import { DataTypes, Model, Sequelize } from "sequelize";

export class Role extends Model {
  declare role_id: number;
  declare name: string;
}

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
        unique: true,
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
