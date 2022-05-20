import { Schema, model } from "mongoose";
import {
  DECIMAL_15_2_MAX,
  DECIMAL_15_2_MIN,
} from "../../config/constants.config";

export interface MonthlyReportInterface {
  createdAt: Date;
  framesSold: number;
  picturesSold: number;
  totalProductsSold: number;
  revenue: number;
}

const monthlyReportSchema = new Schema<MonthlyReportInterface>(
  {
    createdAt: { type: Schema.Types.Date, required: true, default: Date.now() },
    framesSold: { type: Number, required: false },
    picturesSold: { type: Number, required: false },
    totalProductsSold: { type: Number, required: false },
    revenue: {
      type: Schema.Types.Decimal128,
      min: DECIMAL_15_2_MIN,
      max: DECIMAL_15_2_MAX,
      required: true,
    },
  },
  { collection: "monthlyReports", autoCreate: true }
);

export const MonthlyReport = model<MonthlyReportInterface>(
  "MonthlyReport",
  monthlyReportSchema
);
