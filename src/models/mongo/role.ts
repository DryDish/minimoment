import { Schema, model } from "mongoose";

interface RoleInterface {
  name: string;
}

const roleSchema = new Schema<RoleInterface>({
  name: { type: String, maxlength: 45, required: true },
});

export const Role = model<RoleInterface>("Role", roleSchema);
