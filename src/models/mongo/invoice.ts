import { Schema, model } from "mongoose";

interface InvoiceInterface {
  createdAt: Date;
}

const invoiceSchema = new Schema<InvoiceInterface>({
  createdAt: { type: Schema.Types.Date, required: true },
});

export const Invoice = model<InvoiceInterface>("Invoice", invoiceSchema);
