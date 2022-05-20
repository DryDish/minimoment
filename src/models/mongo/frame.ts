import { Schema, model } from "mongoose";
import {
  DECIMAL_3_2_MAX,
  DECIMAL_3_2_MIN,
} from "../../config/constants.config";
import { SizeInterface, sizeSchema } from "./size";

export interface FrameInterface {
  name: string;
  multiplier: number;
  material: string;
  discountCodeId?: string;
  size: SizeInterface;
}

export const frameSchema = new Schema<FrameInterface>(
  {
    name: { type: String, maxlength: 45, required: true },
    multiplier: {
      type: Schema.Types.Decimal128,
      min: DECIMAL_3_2_MIN,
      max: DECIMAL_3_2_MAX,
      required: true,
    },
    material: {
      type: String,
      maxlength: 45,
      required: false,
    },
    discountCodeId: { type: Schema.Types.ObjectId, required: false },
    size: { type: sizeSchema, requiured: true },
  },
  { autoCreate: true }
);

export const Frame = model<FrameInterface>("Frame", frameSchema);
