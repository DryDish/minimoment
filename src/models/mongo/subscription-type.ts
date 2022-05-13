import { Schema, model } from "mongoose";
import {
  DECIMAL_15_2_MAX,
  DECIMAL_15_2_MIN,
} from "../../config/constants.config";

interface SubscriptionTypeInterface {
  name: string;
  monthlyPrice: number;
  imageAmount: number;
}

const subscriptionTypeSchema = new Schema<SubscriptionTypeInterface>({
  name: { type: String, maxlength: 45, unique: true, required: true },
  monthlyPrice: {
    type: Schema.Types.Decimal128,
    min: DECIMAL_15_2_MIN,
    max: DECIMAL_15_2_MAX,
    required: true,
  },
  imageAmount: { type: Number, required: true },
});

export const SubscriptionType = model<SubscriptionTypeInterface>(
  "SubscriptionType",
  subscriptionTypeSchema
);
