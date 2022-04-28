import { DataTypes, Model, Sequelize } from "sequelize";
import { Order } from "./order";

export class OrderItem extends Model {};

export default (sequelize: Sequelize) => {
    OrderItem.init(
        {
            orderItemId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                field: "order_item_id",
            },
            pictureDataId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "picture_data_id",
            },
            paperTypeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "paper_type_id",
            },
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "order_id",
            },
            frameId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: "frame_id",
            },
            orderItemPrice: {
                type: DataTypes.DECIMAL(15, 2),
                allowNull: true,
                field: "order_item_price",
            },
            priceSaved: {
                type: DataTypes.DECIMAL(15, 2),
                allowNull: true,
                field: "price_saved",
            },
            amount: {
                type: DataTypes.DECIMAL(15, 2),
                allowNull: true,
                field: "amount",
            }
        },
        {
            sequelize,
            tableName: "order_items",
        }
    )
}

export const defineOrderItemAssociations = () => {
    // TODO: belongsTo picture data
    // TODO: belongsTo Frames
    // TODO: belongsTo paper Types
    OrderItem.belongsTo(Order, {
        foreignKey: {
            name: "orderId",
            allowNull: false,
            field: "order_id",
        }
    });
}