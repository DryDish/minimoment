import {
  DECIMAL_3_2_MAX,
  DECIMAL_3_2_MIN,
} from "../../config/constants.config";
import { instance } from "../../config/neo4j.config";

export const PaperType = instance.model("Paper_Type", {
  paper_type_id: {
    primary: true,
    type: "uuid",
    required: true,
  },
  name: {
    type: "string",
    max: 45,
    required: true,
  },
  multiplier: {
    type: "float",
    max: DECIMAL_3_2_MAX,
    min: DECIMAL_3_2_MIN,
    required: true,
  },
  has_size: {
    type: "relationship",
    target: "Size",
    relationship: "HAS_SIZE",
    direction: "out",
    eager: true,
  },
  has_discount: {
    type: "relationship",
    target: "Discount_Code",
    relationship: "HAS_DISCOUNT",
    direction: "out",
    eager: true,
  },
});
