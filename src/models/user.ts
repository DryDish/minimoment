import { DataTypes, Model, Sequelize } from "sequelize";

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
        userName: {
            type: DataTypes.TEXT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: false,
            field: "user_name",
        }
    },
    {
        sequelize,
        tableName: "users",
    });
};