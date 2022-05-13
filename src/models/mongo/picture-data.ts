import { Schema, model } from "mongoose";

interface PictureDataInterface {
  imageUrl: string;
  uploadedAt: Date;
}

const pictureDataSchema = new Schema<PictureDataInterface>({
  imageUrl: { type: String, maxlength: 255, required: true },
  uploadedAt: { type: Schema.Types.Date, required: true },
});

export const PictureData = model<PictureDataInterface>(
  "PictureData",
  pictureDataSchema
);
