import { Schema, model } from "mongoose";

interface UserInterface {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  autoRenew: boolean;
}

const userSchema = new Schema<UserInterface>({
  firstName: { type: String, maxlength: 60, required: false },
  lastName: { type: String, maxlength: 60, required: false },
  username: { type: String, maxlength: 255, required: true },
  password: { type: String, maxlength: 255, required: true },
  autoRenew: { type: Boolean, required: false },
});

export const Role = model<UserInterface>("Role", userSchema);
