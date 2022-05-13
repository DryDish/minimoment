import { Schema, model } from "mongoose";

interface SubscriptionInterface {
  startsAt: Date;
  endsAt: Date;
}

const subscriptionSchema = new Schema<SubscriptionInterface>({
  startsAt: { type: Schema.Types.Date, required: true },
  endsAt: { type: Schema.Types.Date, required: true },
});

export const Subscription = model<SubscriptionInterface>(
  "Subscription",
  subscriptionSchema
);
