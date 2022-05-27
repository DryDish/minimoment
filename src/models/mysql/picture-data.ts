import { DataTypes, Model, Sequelize } from "sequelize";
import { OrderItem } from "./order-item";
import { User } from "./user";

export class PictureData extends Model {}

export default (sequelize: Sequelize) => {
  PictureData.init(
    {
      pictureDataId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "picture_data_id",
      },
      imageUrl: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "image_url",
      },
      uploadedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "uploaded_at",
      },
    },
    {
      sequelize,
      tableName: "picture_data",
    }
  );
};

export const definePictureDataAssociations = () => {
  PictureData.belongsTo(User, {
    foreignKey: {
      name: "userId",
      allowNull: false,
      field: "user_id",
    },
  });
  PictureData.hasMany(OrderItem, {
    foreignKey: {
      name: "pictureDataId",
      allowNull: true,
      field: "picture_data_id",
    },
  });
};
