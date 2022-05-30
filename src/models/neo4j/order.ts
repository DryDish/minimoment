import {
  DECIMAL_15_2_MAX,
  DECIMAL_15_2_MIN,
} from "../../config/constants.config";
import { instance } from "../../config/neo4j.config";

export const Order = instance.model("Order", {
  order_id: {
    primary: true,
    type: "uuid",
    required: true,
  },
  order_price: {
    type: "float",
    max: DECIMAL_15_2_MAX,
    min: DECIMAL_15_2_MIN,
    default: 0,
    required: true,
  },
  total_price_saved: {
    type: "float",
    max: DECIMAL_15_2_MAX,
    min: DECIMAL_15_2_MIN,
    default: 0,
    required: false,
  },
  created_at: {
    type: "date",
    required: true,
  },
  has_discount: {
    type: "relationship",
    target: "Discount_Code",
    relationship: "HAS_DISCOUNT",
    direction: "out",
    eager: true,
  },
  has_order: {
    type: "relationship",
    target: "User",
    relationship: "HAS_ORDER",
    direction: "in",
    eager: true,
  },
  has_billing_info: {
    type: "relationship",
    target: "Contact_Info",
    relationship: "HAS_BILLING_INFO",
    direction: "out",
    eager: true,
  },
  has_status: {
    type: "relationship",
    target: "Status",
    relationship: "HAS_STATUS",
    direction: "out",
    eager: true,
  },
});
