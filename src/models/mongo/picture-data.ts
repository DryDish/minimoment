import { Schema, model } from "mongoose";

export interface PictureDataInterface {
  imageUrl: string;
  uploadedAt: Date;
}

export const pictureDataSchema = new Schema<PictureDataInterface>(
  {
    imageUrl: { type: String, maxlength: 255, required: true },
    uploadedAt: { type: Schema.Types.Date, required: true },
  },
  { autoCreate: true }
);

export const PictureData = model<PictureDataInterface>(
  "PictureData",
  pictureDataSchema
);
