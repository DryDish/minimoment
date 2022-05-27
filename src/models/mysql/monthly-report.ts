import { DataTypes, Model, NOW, Sequelize } from "sequelize";

export class MonthlyReport extends Model {}

export default (sequelize: Sequelize) => {
  MonthlyReport.init(
    {
      monthlyReportId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "monthly_report_id",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: NOW,
        field: "created_at",
      },
      framesSold: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "frames_sold",
      },
      picturesSold: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "pictures_sold",
      },
      totalProductsSold: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "total_products_sold",
      },
      revenue: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        field: "revenue",
      },
    },
    {
      sequelize,
      tableName: "monthly_reports",
    }
  );
};
