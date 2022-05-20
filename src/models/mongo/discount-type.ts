import { Schema, model } from "mongoose";

enum DISCOUNT_TYPE_NAMES {
  Percent = "percent",
  Amount = "amount",
}

export interface DiscountTypeInterface {
  name: string;
}

export const discountTypeSchema = new Schema<DiscountTypeInterface>({
  name: {
    type: String,
    enum: DISCOUNT_TYPE_NAMES,
    unique: true,
    required: true,
  },
});

export const DiscountType = model<DiscountTypeInterface>(
  "DiscountType",
  discountTypeSchema
);
