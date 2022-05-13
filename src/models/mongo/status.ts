import { Schema, model } from "mongoose";

interface StatusInterface {
  name: string;
}

const statusSchema = new Schema<StatusInterface>({
  name: { type: String, maxlength: 45, unique: true, required: true },
});

export const Status = model<StatusInterface>("Status", statusSchema);
