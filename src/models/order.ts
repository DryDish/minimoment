import { DataTypes, Model, Sequelize } from "sequelize";
import { ContactInfo } from "./contact-info";
import { User } from "./user";

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
                allowNull: false,
                field: "user_id"
            },
            billingContactInfoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "billing_contact_info_id"
            },
            statusId: {
                type: DataTypes.INTEGER,
                allowNull: false,
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

export const defineOrderAssociations = () => {
    Order.belongsTo(User, {
        foreignKey: {
            name: "userId",
            allowNull: false,
            field: "user_id",
        },
    });
    Order.belongsTo(ContactInfo, {
        foreignKey: {
            name: "billingContactInfoId",
            allowNull: false,
            field: "billing_contact_info_id"
        },
    });
    // belongsTo discount
    // belongsTo Status
}