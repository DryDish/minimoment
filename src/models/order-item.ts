import { DataTypes, Model, Sequelize } from "sequelize";
import { Frame } from "./frame";
import { Order } from "./order";
import { PaperType } from "./paper-type";
import { PictureData } from "./picture-data";

export class OrderItem extends Model {}

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
      orderItemPrice: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        field: "order_item_price",
      },
      priceSaved: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        field: "price_saved",
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "amount",
      },
    },
    {
      sequelize,
      tableName: "order_items",
    }
  );
};

export const defineOrderItemAssociations = () => {
  OrderItem.belongsTo(PictureData, {
    foreignKey: {
      name: "pictureDataId",
      allowNull: true,
      field: "picture_data_id",
    },
  });
  OrderItem.belongsTo(PaperType, {
    foreignKey: {
      name: "paperTypeId",
      allowNull: true,
      field: "paper_type_id",
    },
  });
  OrderItem.belongsTo(Frame, {
    foreignKey: {
      name: "frameId",
      allowNull: true,
      field: "frame_id",
    },
  });
  OrderItem.belongsTo(Order, {
    foreignKey: {
      name: "orderId",
      allowNull: false,
      field: "order_id",
    },
  });
};
