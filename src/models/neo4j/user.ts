import { instance } from "../../config/neo4j.config";

export const User = instance.model("User", {
  user_id: {
    primary: true,
    type: "uuid",
    required: true,
  },
  first_name: {
    type: "string",
    max: 60,
    required: true,
  },
  last_name: {
    type: "string",
    max: 60,
    required: true,
  },
  username: {
    type: "string",
    max: 255,
    required: true,
    unique: true,
    email: true,
  },
  password: {
    type: "string",
    max: 255,
    required: true,
  },
  auto_renew: {
    type: "boolean",
    required: true,
  },
  has_role: {
    type: "relationship",
    target: "Role",
    relationship: "HAS_ROLE",
    direction: "out",
    eager: true,
  },
  has_contact_info: {
    type: "relationship",
    target: "Contact_Info",
    relationship: "HAS_CONTACT_INFO",
    direction: "out",
    eager: true,
  },
});
