import { Schema, model } from "mongoose";
import {
  DECIMAL_15_2_MAX,
  DECIMAL_15_2_MIN,
} from "../../config/constants.config";
import { StatusInterface, statusSchema } from "./status";

interface OrderInterface {
  orderPrice: number;
  totalPriceSaved: number;
  createdAt: Date;
  discountCodeId: Schema.Types.ObjectId;
  status: StatusInterface;
}

const orderSchema = new Schema<OrderInterface>({
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
  status: { type: statusSchema, required: true },
});
