import { DataTypes, Model, Sequelize } from "sequelize";
import { DiscountCode } from "./discount-code";
import { OrderItem } from "./order-item";

export class PaperType extends Model {};

export default (sequelize: Sequelize) => {
    PaperType.init(
        {
            paperTypeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                field: "paper_type_id",
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
                allowNull: false,
                field: "multiplier",
            },
            sizeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "size_id",
            }
        },
        {
            sequelize,
            tableName: "paper_types",
        },
    );
}

export const definePaperTypeAssociations = () => {
    PaperType.belongsTo(DiscountCode, {
        foreignKey: {
            name: "discountCodeId",
            allowNull: true,
            field: "discount_code_id",
        }
    });
    PaperType.hasMany(OrderItem, {
        foreignKey: {
            name: "paperTypeId",
            allowNull: true,
            field: "paper_type_id",
        },
    });
    // TODO: belongs to size
}