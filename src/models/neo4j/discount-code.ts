import {
  DECIMAL_15_2_MAX,
  DECIMAL_15_2_MIN,
} from "../../config/constants.config";
import { instance } from "../../config/neo4j.config";

export const DiscountCode = instance.model("Discount_Code", {
  discount_code_id: {
    primary: true,
    type: "uuid",
    required: true,
  },
  name: {
    type: "string",
    max: 45,
    unique: true,
    required: true,
  },
  value: {
    type: "float",
    max: DECIMAL_15_2_MAX,
    min: DECIMAL_15_2_MIN,
    required: true,
  },
  valid_from: {
    type: "date",
    required: true,
  },
  valid_to: {
    type: "date",
    required: true,
  },
  remaining_uses: {
    type: "integer",
    required: true,
  },
  has_discount_type: {
    type: "relationship",
    target: "Discount_Type",
    relationship: "HAS_DISCOUNT_TYPE",
    direction: "out",
    eager: true,
  },
});
