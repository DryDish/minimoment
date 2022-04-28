import { DataTypes, Model, Sequelize } from "sequelize";
import { Order } from "./order";
import { User } from "./user";

export class ContactInfo extends Model {}

export default (sequelize: Sequelize) => {
  ContactInfo.init(
    {
      contactInfoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "contact_info_id",
      },
      phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: "phone_number",
      },
      countryCode: {
        type: DataTypes.STRING(3),
        allowNull: false,
        field: "country_code",
      },
      city: {
        type: DataTypes.STRING(97),
        allowNull: false,
        field: "city",
      },
      postalCode: {
        type: DataTypes.STRING(8),
        allowNull: false,
        field: "postal_code",
      },
      addressOne: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "address_one",
      },
      addressTwo: {
        type: DataTypes.STRING(255),
        field: "address_two",
      },
    },
    {
      sequelize,
      tableName: "contact_info",
    }
  );
};

export const defineContactInfoAssociations = () => {
  ContactInfo.hasMany(User, {
    foreignKey: {
      name: "contactInfoId",
      allowNull: true,
      field: "contact_info_id",
    },
  });
  ContactInfo.hasMany(Order, {
    foreignKey: {
      name: "contactInfoId",
      allowNull: false,
      field: "contact_info_id",
    },
  });
};
