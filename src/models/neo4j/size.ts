import {
  DECIMAL_15_2_MAX,
  DECIMAL_15_2_MIN,
} from "../../config/constants.config";
import { instance } from "../../config/neo4j.config";

export const Size = instance.model("Size", {
  size_id: {
    primary: true,
    type: "uuid",
    required: true,
  },
  name: {
    type: "string",
    max: 45,
    required: true,
  },
  width_mm: {
    type: "integer",
    required: true,
  },
  height_mm: {
    type: "integer",
    required: true,
  },
  price: {
    type: "float",
    max: DECIMAL_15_2_MAX,
    min: DECIMAL_15_2_MIN,
    required: true,
  },
});
