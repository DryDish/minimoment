import { Schema, model } from "mongoose";

export interface StatusInterface {
  name: string;
}

export const statusSchema = new Schema<StatusInterface>(
  {
    name: { type: String, maxlength: 45, unique: true, required: true },
  },
  { collection: "statuses", autoCreate: true }
);

export const statusSchemaNested = new Schema<StatusInterface>(
  {
    name: { type: String, maxlength: 45, required: true },
  },
  { autoCreate: false }
);

export const Status = model<StatusInterface>("Status", statusSchema);
