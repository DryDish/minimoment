import { DataTypes, Model, Sequelize } from "sequelize";

export class Invoice extends Model {};

export default (sequelize: Sequelize) => {
    Invoice.init(
        {
            invoiceId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                field: "invoice_id",
            },
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "order_id"
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: "created_at"
            }
        },
        {
            sequelize,
            tableName: "invoices",
        }
    )
}