import {
  DECIMAL_3_2_MAX,
  DECIMAL_3_2_MIN,
} from "../../config/constants.config";
import { instance } from "../../config/neo4j.config";

export const Frame = instance.model("Frame", {
  frame_id: {
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
  material: {
    type: "string",
    max: 45,
    required: true,
  },
  has_discount: {
    type: "relationship",
    target: "Discount_Code",
    relationship: "HAS_DISCOUNT",
    direction: "out",
    eager: true,
  },
  has_size: {
    type: "relationship",
    target: "Size",
    relationship: "HAS_SIZE",
    direction: "out",
    eager: true,
  },
});
