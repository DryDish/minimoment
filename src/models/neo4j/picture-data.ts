import { instance } from "../../config/neo4j.config";

export const PictureData = instance.model("Picture_Data", {
  picture_data_id: {
    primary: true,
    type: "uuid",
    required: true,
  },
  image_url: {
    type: "string",
    max: 255,
    required: true,
  },
  uploaded_at: {
    type: "date",
    required: true,
  },
  has_picture: {
    type: "relationship",
    target: "User",
    relationship: "HAS_PICTURE",
    direction: "in",
    eager: true,
  },
});
