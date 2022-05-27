import { instance } from "../../config/neo4j.config";

export const Status = instance.model("Status", {
  status_id: {
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
});
