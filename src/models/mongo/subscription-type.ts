import { Schema, model } from "mongoose";
import {
  DECIMAL_15_2_MAX,
  DECIMAL_15_2_MIN,
} from "../../config/constants.config";

export interface SubscriptionTypeInterface {
  name: string;
  monthlyPrice: number;
  imageAmount: number;
}

export const subscriptionTypeSchema = new Schema<SubscriptionTypeInterface>(
  {
    name: { type: String, maxlength: 45, unique: true, required: true },
    monthlyPrice: {
      type: Schema.Types.Decimal128,
      min: DECIMAL_15_2_MIN,
      max: DECIMAL_15_2_MAX,
      required: true,
    },
    imageAmount: { type: Number, required: true },
  },
  { collection: "subscriptionTypes", autoCreate: true }
);

export const nestedSubscriptionTypeSchema =
  new Schema<SubscriptionTypeInterface>(
    {
      name: { type: String, maxlength: 45, required: true },
      monthlyPrice: {
        type: Schema.Types.Decimal128,
        min: DECIMAL_15_2_MIN,
        max: DECIMAL_15_2_MAX,
        required: true,
      },
      imageAmount: { type: Number, required: true },
    },
    { autoCreate: false, _id: false }
  );

export const SubscriptionType = model<SubscriptionTypeInterface>(
  "SubscriptionType",
  subscriptionTypeSchema
);
