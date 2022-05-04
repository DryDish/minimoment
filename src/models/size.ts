import { DataTypes, Model, Sequelize } from "sequelize";
import { Frame } from "./frame";
import { PaperType } from "./paper-type";

export class Size extends Model {}

export default (sequelize: Sequelize) => {
  Size.init(
    {
      sizeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "size_id",
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "name",
      },
      widthMm: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "width_mm",
      },
      heightMm: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "height_mm",
      },
      price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        field: "price",
      },
    },
    {
      sequelize,
      tableName: "sizes",
    }
  );
};

export const defineSizeAssociations = () => {
  Size.hasMany(PaperType, {
    foreignKey: {
      name: "sizeId",
      allowNull: false,
      field: "size_id",
    },
  });
  Size.hasMany(Frame, {
    foreignKey: {
      name: "sizeId",
      allowNull: false,
      field: "size_id",
    },
  });
};
