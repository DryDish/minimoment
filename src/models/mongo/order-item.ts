import { Schema, model } from "mongoose";
import {
  DECIMAL_15_2_MAX,
  DECIMAL_15_2_MIN,
} from "../../config/constants.config";

interface OrderItemInterface {
  orderItemPrice: number;
  priceSaved: number;
  amount: number;
}

const orderItemSchema = new Schema<OrderItemInterface>({
  orderItemPrice: {
    type: Schema.Types.Decimal128,
    min: DECIMAL_15_2_MIN,
    max: DECIMAL_15_2_MAX,
    required: true,
  },
  priceSaved: {
    type: Schema.Types.Decimal128,
    min: DECIMAL_15_2_MIN,
    max: DECIMAL_15_2_MAX,
    required: false,
  },
  amount: { type: Number, required: true },
});

export const OrderItem = model<OrderItemInterface>(
  "OrderItem",
  orderItemSchema
);
