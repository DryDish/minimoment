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
            discountCodeId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: "discount_code_id"
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: "user_id"
            },
            billingContactInfoId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: "billing_contact_info_id"
            },
            statusId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: "status_id"
            },
            orderPrice: {
                type: DataTypes.DECIMAL(15,2),
                allowNull: true,
                field: "order_price"
            },
            totalPriceSaved: {
                type: DataTypes.DECIMAL(15,2),
                allowNull: true,
                field: "total_price_saved"
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: "created_at"
            }
        },
        {
            sequelize,
            tableName: "orders",
        }
    )
}