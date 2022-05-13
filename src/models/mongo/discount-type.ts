import { Schema, model } from "mongoose";

enum DISCOUNT_TYPE_NAMES {
  Percent = "percent",
  Amount = "amount",
}

interface DiscountTypeInterface {
  name: string;
}

const discountTypeSchema = new Schema<DiscountTypeInterface>({
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
