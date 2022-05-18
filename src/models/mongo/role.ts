import { Schema, model } from "mongoose";

export interface RoleInterface {
  name: string;
}

export const roleSchema = new Schema<RoleInterface>({
  name: { type: String, maxlength: 45, required: true },
});

export const Role = model<RoleInterface>("Role", roleSchema);
