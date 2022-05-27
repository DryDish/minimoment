import { instance } from "../../config/neo4j.config";

export const ContactInfo = instance.model("Contact_Info", {
  contact_info_id: {
    primary: true,
    type: "uuid",
    required: true,
  },
  phone_number: {
    type: "string",
    max: 20,
    required: true,
  },
  country_code: {
    type: "string",
    max: 3,
    required: true,
  },
  city: {
    type: "string",
    max: 97,
    required: true,
  },
  postal_code: {
    type: "string",
    max: 8,
    required: true,
  },
  address_one: {
    type: "string",
    max: 255,
    required: true,
  },
  address_two: {
    type: "string",
    max: 255,
    required: false,
  },
});
