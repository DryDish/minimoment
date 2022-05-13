import { Order } from "../../models/mysql/order";
import { OrderItem } from "../../models/mysql/order-item";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { GenericService } from "./generic-model.service";

export class OrderItemService extends GenericService<OrderItem> {
  constructor(protected model: any) {
    super(model);
  }

  async findByOrderId(orderId: string): Promise<CustomResult<OrderItem[]>> {
    try {
      const orderItemList = await OrderItem.findAll({
        where: { orderId },
      });
      return new CustomResult(StatusCode.Success, orderItemList);
    } catch (error) {
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async findByUserId(userId: string): Promise<CustomResult<OrderItem[]>> {
    try {
      const orderList = await Order.findAll({ where: { userId } });
      const orderItemList: OrderItem[] = [];

      for (const order of orderList) {
        orderItemList.push(
          ...(await OrderItem.findAll({
            where: { orderId: order.getDataValue("orderId") },
          }))
        );
      }
      return new CustomResult(StatusCode.Success, orderItemList);
    } catch (error) {
      return new CustomResult(StatusCode.ServerError);
    }
  }
}
