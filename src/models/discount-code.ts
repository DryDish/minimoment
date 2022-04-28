import { DataTypes, Model, Sequelize } from "sequelize";

export class DiscountCode extends Model {}

export default (sequelize: Sequelize) => {
  DiscountCode.init(
    {
      DiscountCodeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "discount_code_id",
      },
      name: {
        type: DataTypes.ENUM("percent", "amount"),
        allowNull: false,
        unique: true,
        field: "name",
      },
      value: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        field: "value",
      },
      validFrom: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "valid_from",
      },
      validTo: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "valid_to",
      },
      remainingUses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "remaining_uses"
      },
    },
    {
      sequelize,
      tableName: "discount_codes",
    }
  );
};


// TODO - add relationship to code type
