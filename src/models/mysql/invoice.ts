import { DataTypes, Model, Sequelize } from "sequelize";
import { Order } from "./order";

export class Invoice extends Model {}

export default (sequelize: Sequelize) => {
  Invoice.init(
    {
      invoiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "invoice_id",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
    },
    {
      sequelize,
      tableName: "invoices",
    }
  );
};

export const defineInvoiceAssociations = () => {
  Invoice.belongsTo(Order, {
    foreignKey: {
      name: "orderId",
      allowNull: false,
      field: "order_id",
    },
  });
};
