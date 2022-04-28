import { DataTypes, Model, Sequelize } from "sequelize";
import { DiscountCode } from "./discount-code";

export class Frame extends Model {}; 

export default (sequelize: Sequelize) => {
    Frame.init(
        {
            frameId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                field: "frame_id",
            },
            discountCodeId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: "discount_code_id"
            },
            name: {
                type: DataTypes.STRING(45),
                allowNull: false,
                field: "name",
            },
            multiplier: {
                type: DataTypes.DECIMAL(3, 2),
                allowNull: true,
                field: "multiplier",
            },
            material: {
                type: DataTypes.STRING(45),
                allowNull: false,
                field: "material",
            },
            sizeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "size_id",
            }
        },
        {
            sequelize,
            tableName: "frames",
        }
    )
}

export const defineFrameAssociations = () => {
    Frame.belongsTo(DiscountCode, {
        foreignKey: {
            name: "discountCodeId",
            allowNull: true,
            field: "discount_code_id",
        }
    });
    // TODO: belongsTo size
}