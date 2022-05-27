import { instance } from "../../config/neo4j.config";
import {
  DECIMAL_15_2_MAX,
  DECIMAL_15_2_MIN,
} from "../../config/constants.config";

export const SubscriptionType = instance.model("Subscription_Type", {
  subscription_type_id: {
    primary: true,
    type: "uuid",
    required: true,
  },
  name: {
    type: "string",
    max: 45,
    required: true,
    unique: true,
  },
  monthly_price: {
    type: "float",
    max: DECIMAL_15_2_MAX,
    min: DECIMAL_15_2_MIN,
    required: true,
  },
  image_amount: {
    type: "integer",
    required: true,
  },
});
