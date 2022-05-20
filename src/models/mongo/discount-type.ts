import { Schema, model } from "mongoose";

enum DISCOUNT_TYPE_NAMES {
  Percent = "percent",
  Amount = "amount",
}

export interface DiscountTypeInterface {
  name: DISCOUNT_TYPE_NAMES;
}

export const discountTypeSchema = new Schema<DiscountTypeInterface>(
  {
    name: {
      type: String,
      enum: DISCOUNT_TYPE_NAMES,
      required: true,
    },
  },
  { autoCreate: false, _id: false }
);

export const DiscountType = model<DiscountTypeInterface>(
  "DiscountType",
  discountTypeSchema
);
