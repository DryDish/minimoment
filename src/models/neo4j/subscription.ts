import { instance } from "../../config/neo4j.config";

export const Subscription = instance.model("Subscription", {
  subscription_id: {
    primary: true,
    type: "uuid",
    required: true,
  },
  starts_at: {
    type: "date",
    required: true,
  },
  ends_at: {
    type: "date",
    required: true,
  },
  has_subscription: {
    type: "relationship",
    target: "User",
    relationship: "HAS_SUBSCRIPTION",
    direction: "in",
    eager: true,
  },
  has_subscription_type: {
    type: "relationship",
    target: "Subscription_Type",
    relationship: "HAS_SUBSCRIPTION_TYPE",
    direction: "out",
    eager: true,
  },
});
