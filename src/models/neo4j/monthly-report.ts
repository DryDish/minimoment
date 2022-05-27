import {
  DECIMAL_15_2_MAX,
  DECIMAL_15_2_MIN,
} from "../../config/constants.config";
import { instance } from "../../config/neo4j.config";

export const MonthlyReport = instance.model("Monthly_Report", {
  monthly_report_id: {
    primary: true,
    type: "uuid",
    required: true,
  },
  created_at: {
    type: "date",
    default: () => new Date(),
    required: true,
  },
  frames_sold: {
    type: "integer",
    required: false,
  },
  pictures_sold: {
    type: "integer",
    required: false,
  },
  total_products_sold: {
    type: "integer",
    required: false,
  },
  revenue: {
    type: "float",
    max: DECIMAL_15_2_MAX,
    min: DECIMAL_15_2_MIN,
    required: true,
  },
});
