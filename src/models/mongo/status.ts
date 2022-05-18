import { Schema, model } from "mongoose";

export interface StatusInterface {
  name: string;
}

export const statusSchema = new Schema<StatusInterface>({
  name: { type: String, maxlength: 45, unique: true, required: true },
});

export const Status = model<StatusInterface>("Status", statusSchema);
