import { DataTypes, Model, Sequelize } from "sequelize";

export class Order extends Model {}

export default (sequelize: Sequelize) => {
    Order.init(
    {
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: "order_id",
        },
        orderName: {
            type: DataTypes.TEXT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: false,
            field: "order_name",
        }
    },
    {
        sequelize,
        tableName: "orders",
    });
};