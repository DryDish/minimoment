import { Schema, model } from "mongoose";
import {
  DECIMAL_15_2_MAX,
  DECIMAL_15_2_MIN,
} from "../../config/constants.config";

interface SizeInterface {
  name: string;
  widthMm: number;
  heightMm: number;
  price: number;
}

const sizeSchema = new Schema<SizeInterface>({
  name: { type: String, maxlength: 45, required: true },
  widthMm: { type: Number, required: true },
  heightMm: { type: Number, required: true },
  price: {
    type: Schema.Types.Decimal128,
    min: DECIMAL_15_2_MIN,
    max: DECIMAL_15_2_MAX,
    required: true,
  },
});

export const Size = model<SizeInterface>("Size", sizeSchema);
