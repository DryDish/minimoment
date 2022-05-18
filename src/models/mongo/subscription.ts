import { Schema, model } from "mongoose";
import {
  SubscriptionTypeInterface,
  subscriptionTypeSchema,
} from "./subscription-type";

export interface SubscriptionInterface {
  startsAt: Date;
  endsAt: Date;
  subscriptionType: SubscriptionTypeInterface;
}

export const subscriptionSchema = new Schema<SubscriptionInterface>({
  startsAt: { type: Schema.Types.Date, required: true },
  endsAt: { type: Schema.Types.Date, required: true },
  subscriptionType: { type: subscriptionTypeSchema, required: true },
});

export const Subscription = model<SubscriptionInterface>(
  "Subscription",
  subscriptionSchema
);
