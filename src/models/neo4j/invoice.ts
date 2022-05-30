import { instance } from "../../config/neo4j.config";

export const Invoice = instance.model("Invoice", {
  invoice_id: {
    primary: true,
    type: "uuid",
    required: true,
  },
  created_at: {
    type: "date",
    required: true,
  },
  has_order: {
    type: "relationship",
    target: "Order",
    relationship: "HAS_ORDER",
    direction: "out",
    eager: true,
  },
});
