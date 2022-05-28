import { User } from "../../models/neo4j/user";
import { Subscription } from "../../models/neo4j/subscription";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { GenericService } from "./generic-model.service";
import { SubscriptionType } from "../../models/neo4j/subscription-type";
import { isValidNeoId } from "../../utils/neo-validator";
import { instance } from "../../config/neo4j.config";

export class SubscriptionService extends GenericService<typeof Subscription> {
  constructor(protected model: typeof Subscription) {
    super(model);
  }

  async create(body: any): Promise<CustomResult<typeof Subscription>> {
    try {
      const userObject = await User.find(body.user_id);
      if (!userObject) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const subscriptionTypeObject = await SubscriptionType.find(
        body.subscription_type_id
      );
      if (!subscriptionTypeObject) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const subscription = await this.model.create(body);

      subscription.relateTo(userObject, "has_subscription");
      subscription.relateTo(subscriptionTypeObject, "has_subscription_type");

      return new CustomResult(
        StatusCode.Created,
        subscription.properties() as typeof Subscription
      );
    } catch (error) {
      console.error(error);
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async update(
    id: string,
    body: any
  ): Promise<CustomResult<typeof Subscription>> {
    if (isValidNeoId(id)) {
      try {
        const subscriptionToEdit = await this.model.find(id);

        if (subscriptionToEdit) {
          const userObject = await User.find(body.user_id);
          if (!userObject) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const subscriptionTypeObject = await SubscriptionType.find(
            body.subscription_type_id
          );
          if (!subscriptionTypeObject) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const subscription = await subscriptionToEdit.update(body);

          subscription.relateTo(userObject, "has_subscription");
          subscription.relateTo(
            subscriptionTypeObject,
            "has_subscription_type"
          );

          return new CustomResult(
            StatusCode.Created,
            subscription.properties() as typeof Subscription
          );
        } else {
          return new CustomResult(StatusCode.NotFound);
        }
      } catch (error) {
        console.error(error);
        return new CustomResult(StatusCode.ServerError);
      }
    } else {
      console.log("Invalid id");
      return new CustomResult(StatusCode.BadRequest);
    }
  }

  async findByUserId(
    userId: string
  ): Promise<CustomResult<typeof Subscription[]>> {
    if (isValidNeoId(userId)) {
      try {
        const queryResult = await instance.cypher(
          "MATCH (s: Subscription)<-[:HAS_SUBSCRIPTION]-(u: User {user_id: $user_id}) RETURN s;",
          { user_id: userId }
        );

        const result = queryResult.records.map(
          (record) => record.get("s")["properties"]
        );

        return new CustomResult(StatusCode.Success, result);
      } catch (error) {
        console.log(error);
        return new CustomResult(StatusCode.ServerError);
      }
    } else {
      console.log("Invalid id");
      return new CustomResult(StatusCode.BadRequest);
    }
  }
}
