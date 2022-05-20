import { Schema, model } from "mongoose";
import {
  nestedSubscriptionTypeSchema,
  SubscriptionTypeInterface,
  subscriptionTypeSchema,
} from "./subscription-type";

export interface SubscriptionInterface {
  startsAt: Date;
  endsAt: Date;
  subscriptionType: SubscriptionTypeInterface;
}

export const subscriptionSchema = new Schema<SubscriptionInterface>(
  {
    startsAt: { type: Schema.Types.Date, required: true },
    endsAt: { type: Schema.Types.Date, required: true },
    subscriptionType: { type: nestedSubscriptionTypeSchema, required: true },
  },
  { collection: "subscriptions", autoCreate: false, _id: false }
);

export const Subscription = model<SubscriptionInterface>(
  "Subscription",
  subscriptionSchema
);
