import { Schema, model } from "mongoose";
import { ContactInfoInterface, contactInfoSchema } from "./contact-info";
import { PictureDataInterface, pictureDataSchema } from "./picture-data";
import { roleSchemaNested, RoleInterface } from "./role";
import { subscriptionSchema, SubscriptionInterface } from "./subscription";

export interface UserInterface {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  autoRenew: boolean;
  role?: RoleInterface;
  subscriptions?: SubscriptionInterface[];
  contactInfo?: ContactInfoInterface;
  pictureData?: PictureDataInterface[];
  orderIds?: string[];
}

const userSchema = new Schema<UserInterface>(
  {
    firstName: { type: String, maxlength: 60, required: false },
    lastName: { type: String, maxlength: 60, required: false },
    username: { type: String, maxlength: 255, required: true },
    password: { type: String, maxlength: 255, required: true },
    autoRenew: { type: Boolean, required: false },
    role: { type: roleSchemaNested, required: true, default: { name: "user" } },
    subscriptions: [{ type: subscriptionSchema, required: false }],
    contactInfo: { type: contactInfoSchema, required: false },
    pictureData: [{ type: pictureDataSchema, required: false }],
    orderIds: [{ type: Schema.Types.ObjectId, ref: "Order", required: false }],
  },
  { collection: "users", autoCreate: true },

);

export const User = model<UserInterface>("User", userSchema);
