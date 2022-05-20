import { Schema, model } from "mongoose";
import { OrderInterface, orderSchema } from "./order";

export interface InvoiceInterface {
  createdAt: Date;
  order: OrderInterface;
}

const invoiceSchema = new Schema<InvoiceInterface>(
  {
    createdAt: { type: Schema.Types.Date, required: true },
    order: { type: orderSchema, required: true },
  },
  { autoCreate: true }
);

export const Invoice = model<InvoiceInterface>("Invoice", invoiceSchema);
