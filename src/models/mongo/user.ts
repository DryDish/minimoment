import { Schema, model } from "mongoose";
import { Subscription } from "../mysql/subscription";
import { roleSchema, RoleInterface } from "./role";
import { subscriptionSchema } from "./subscription";

interface UserInterface {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  autoRenew: boolean;
  role?: RoleInterface;
  subscriptions?: Subscription[];
}

const userSchema = new Schema<UserInterface>({
  firstName: { type: String, maxlength: 60, required: false },
  lastName: { type: String, maxlength: 60, required: false },
  username: { type: String, maxlength: 255, required: true },
  password: { type: String, maxlength: 255, required: true },
  autoRenew: { type: Boolean, required: false },
  role: { type: roleSchema, required: true, default: { name: "user" } },
  subscriptions: [{ type: subscriptionSchema, required: false }],
});

export const User = model<UserInterface>("User", userSchema);
