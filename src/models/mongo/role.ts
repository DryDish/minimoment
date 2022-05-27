import { Schema, model } from "mongoose";

export interface RoleInterface {
  name: string;
}

export const roleSchema = new Schema<RoleInterface>(
  {
    name: { type: String, maxlength: 45, required: true, unique: true },
  },
  { collection: "roles", autoCreate: true }
);

export const roleSchemaNested = new Schema<RoleInterface>(
  {
    name: { type: String, maxlength: 45, required: true },
  },
  { autoCreate: false }
);

export const Role = model<RoleInterface>("Role", roleSchema);
