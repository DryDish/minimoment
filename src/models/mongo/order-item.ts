import { Schema, model } from "mongoose";
import {
  DECIMAL_15_2_MAX,
  DECIMAL_15_2_MIN,
} from "../../config/constants.config";
import { FrameInterface, frameSchema } from "./frame";

interface OrderItemInterface {
  orderItemPrice: number;
  priceSaved: number;
  amount: number;
  frame: FrameInterface;
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
  frame: { type: frameSchema, required: false },
});

export const OrderItem = model<OrderItemInterface>(
  "OrderItem",
  orderItemSchema
);
