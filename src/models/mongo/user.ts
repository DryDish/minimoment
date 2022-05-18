import { Schema, model } from "mongoose";
import { roleSchema, RoleInterface } from "./role";

interface UserInterface {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  autoRenew: boolean;
  role?: RoleInterface;
}

const userSchema = new Schema<UserInterface>({ 
  firstName: { type: String, maxlength: 60, required: false },
  lastName: { type: String, maxlength: 60, required: false },
  username: { type: String, maxlength: 255, required: true },
  password: { type: String, maxlength: 255, required: true },
  autoRenew: { type: Boolean, required: false },
  role: { type: roleSchema, required: true, default: { name: "user" } },
});

export const User = model<UserInterface>("User", userSchema);
 