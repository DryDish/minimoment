import { Schema, model } from "mongoose";
import {
  DECIMAL_15_2_MAX,
  DECIMAL_15_2_MIN,
} from "../../config/constants.config";
import { ContactInfoInterface, contactInfoSchema } from "./contact-info";
import { OrderItemInterface, orderItemSchema } from "./order-item";
import { StatusInterface, statusSchema, statusSchemaNested } from "./status";

export interface OrderInterface {
  orderPrice: number;
  totalPriceSaved: number;
  createdAt: Date;
  discountCodeId?: string;
  status: StatusInterface;
  billingContactInfo: ContactInfoInterface;
  orderItems?: OrderItemInterface[];
}

export const orderSchema = new Schema<OrderInterface>(
  {
    orderPrice: {
      type: Schema.Types.Decimal128,
      min: DECIMAL_15_2_MIN,
      max: DECIMAL_15_2_MAX,
      required: true,
      default: 0,
    },
    totalPriceSaved: {
      type: Schema.Types.Decimal128,
      min: DECIMAL_15_2_MIN,
      max: DECIMAL_15_2_MAX,
      required: false,
      default: 0,
    },
    createdAt: { type: Schema.Types.Date, required: true },
    discountCodeId: { type: Schema.Types.ObjectId, required: false },
    status: { type: statusSchemaNested, required: true },
    billingContactInfo: { type: contactInfoSchema, required: true },
    orderItems: [{ type: orderItemSchema, required: false }],
  },
  { collection: "orders", autoCreate: true }
);

export const Order = model<OrderInterface>("Order", orderSchema);
