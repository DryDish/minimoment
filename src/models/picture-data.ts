import { DataTypes, Model, Sequelize } from "sequelize";

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
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "user_id",
            },
            imageUrl: {
                type: DataTypes.STRING(255),
                allowNull: false,
                field: "image_url",
            },
            uploadedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: "uploaded_at",
            }
        },
        {
            sequelize,
            tableName: "picture_data",
        }
    )
}