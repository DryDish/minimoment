import { Order } from "../../models/mysql/order";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { GenericService } from "./generic-model.service";

export class OrderService extends GenericService<Order> {
  constructor(protected model: any) {
    super(model);
  }

  async findByUserId(userId: string): Promise<CustomResult<Order[]>> {
    try {
      const orderList = await Order.findAll({
        where: { userId },
      });
      return new CustomResult(StatusCode.Success, orderList);
    } catch (error) {
      return new CustomResult(StatusCode.ServerError);
    }
  }
}
