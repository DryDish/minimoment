import { DiscountCode } from "../../models/neo4j/discount-code";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { GenericService } from "./generic-model.service";
import { isValidNeoId } from "../../utils/neo-validator";
import { DiscountType } from "../../models/neo4j/discount-type";

export class DiscountCodeService extends GenericService<typeof DiscountCode> {
  constructor(protected model: typeof DiscountCode) {
    super(model);
  }

  async create(body: any): Promise<CustomResult<typeof DiscountCode>> {
    try {
      const discountType = await DiscountType.find(body.discount_type_id);
      if (!discountType) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const discountCode = await this.model.create(body);

      discountCode.relateTo(discountType, "has_discount_type");

      return new CustomResult(
        StatusCode.Created,
        discountCode.properties() as typeof DiscountCode
      );
    } catch (error) {
      console.error(error);
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async update(
    id: string,
    body: any
  ): Promise<CustomResult<typeof DiscountCode>> {
    if (isValidNeoId(id)) {
      try {
        const discountCodeToEdit = await this.model.find(id);

        if (discountCodeToEdit) {
          const discountType = await DiscountType.find(body.discount_type_id);
          if (!discountType) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const discountCode = await discountCodeToEdit.update(body);

          discountCode.relateTo(discountType, "has_discount_type");

          return new CustomResult(
            StatusCode.Created,
            discountCode.properties() as typeof DiscountCode
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
}
