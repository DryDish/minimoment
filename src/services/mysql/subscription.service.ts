import { Subscription } from "../../models/mysql/subscription";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { GenericService } from "./generic-model.service";

export class SubscriptionService extends GenericService<Subscription> {
  constructor(protected model: any) {
    super(model);
  }

  async findByUserId(userId: string): Promise<CustomResult<Subscription[]>> {
    try {
      const orderList = await Subscription.findAll({
        where: { userId },
      });
      return new CustomResult(StatusCode.Success, orderList);
    } catch (error) {
      return new CustomResult(StatusCode.ServerError);
    }
  }
}