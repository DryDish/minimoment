import { instance } from "../../config/neo4j.config";

export const DiscountType = instance.model("Discount_Type", {
  discount_type_id: {
    primary: true,
    type: "uuid",
    required: true,
  },
  name: {
    type: "string",
    unique: true,
    required: true,
  },
});
