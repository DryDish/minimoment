import { DataTypes, Model, Sequelize } from "sequelize";
import { DiscountCode } from "./discount-code";
import { OrderItem } from "./order-item";
import { Size } from "./size";

export class Frame extends Model {}

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
      material: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: "material",
      },
    },
    {
      sequelize,
      tableName: "frames",
    }
  );
};

export const defineFrameAssociations = () => {
  Frame.belongsTo(DiscountCode, {
    foreignKey: {
      name: "discountCodeId",
      allowNull: true,
      field: "discount_code_id",
    },
  });
  Frame.belongsTo(Size, {
    foreignKey: {
      name: "sizeId",
      allowNull: false,
      field: "size_id",
    },
  });
  Frame.hasMany(OrderItem, {
    foreignKey: {
      name: "frameId",
      allowNull: true,
      field: "frame_id",
    },
  });
};
