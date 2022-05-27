import {
  DECIMAL_15_2_MAX,
  DECIMAL_15_2_MIN,
} from "../../config/constants.config";
import { instance } from "../../config/neo4j.config";

export const OrderItem = instance.model("Order_Item", {
  order_item_id: {
    primary: true,
    type: "uuid",
    required: true,
  },
  order_item_price: {
    type: "float",
    max: DECIMAL_15_2_MAX,
    min: DECIMAL_15_2_MIN,
    required: true,
  },
  price_saved: {
    type: "float",
    max: DECIMAL_15_2_MAX,
    min: DECIMAL_15_2_MIN,
    required: false,
  },
  amount: {
    type: "integer",
    required: true,
  },
  has_picture: {
    type: "relationship",
    target: "Picture_Data",
    relationship: "HAS_PICTURE",
    direction: "out",
    eager: true,
  },
  has_paper: {
    type: "relationship",
    target: "Paper_Type",
    relationship: "HAS_PAPER",
    direction: "out",
    eager: true,
  },
  has_frame: {
    type: "relationship",
    target: "Frame",
    relationship: "HAS_FRAME",
    direction: "out",
    eager: true,
  },
  has_item: {
    type: "relationship",
    target: "Order",
    relationship: "HAS_ITEM",
    direction: "in",
    eager: true,
  },
});
