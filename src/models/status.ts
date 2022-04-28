import { DataTypes, Model, Sequelize } from "sequelize";

export class Status extends Model {}

export default (sequelize: Sequelize) => {
  Status.init(
    {
      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "status_id",
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
      tableName: "statuses",
    }
  );
};
