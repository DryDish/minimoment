import { Schema, model } from "mongoose";
import {
  DECIMAL_3_2_MAX,
  DECIMAL_3_2_MIN,
} from "../../config/constants.config";

interface PaperTypeInterface {
  name: string;
  multiplier: number;
  discountCodeId: Schema.Types.ObjectId;
}

const paperTypeSchema = new Schema<PaperTypeInterface>({
  name: { type: String, maxlength: 45, required: true },
  multiplier: {
    type: Schema.Types.Decimal128,
    min: DECIMAL_3_2_MIN,
    max: DECIMAL_3_2_MAX,
    required: true,
  },
  discountCodeId: { type: Schema.Types.ObjectId, required: false },
});

export const PaperType = model<PaperTypeInterface>(
  "PaperType",
  paperTypeSchema
);
