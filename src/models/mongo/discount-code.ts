import { Schema, model } from "mongoose";
import {
  DECIMAL_15_2_MAX,
  DECIMAL_15_2_MIN,
} from "../../config/constants.config";
import { DiscountTypeInterface, discountTypeSchema } from "./discount-type";

export interface DiscountCodeInterface {
  name: string;
  value: number;
  validFrom: Date;
  validTo: Date;
  remainingUses: number;
  discountType: DiscountTypeInterface;
}

const discountCodeSchema = new Schema<DiscountCodeInterface>(
  {
    name: { type: String, maxlength: 45, unique: true, required: true },
    value: {
      type: Schema.Types.Decimal128,
      min: DECIMAL_15_2_MIN,
      max: DECIMAL_15_2_MAX,
      required: true,
    },
    validFrom: { type: Schema.Types.Date, required: true },
    validTo: { type: Schema.Types.Date, required: true },
    remainingUses: { type: Number, required: false },
    discountType: { type: discountTypeSchema, required: true },
  },
  { autoCreate: true }
);

export const DiscountCode = model<DiscountCodeInterface>(
  "DiscountCode",
  discountCodeSchema
);
