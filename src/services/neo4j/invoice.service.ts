import { Invoice } from "../../models/neo4j/invoice";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { GenericService } from "./generic-model.service";
import { isValidNeoId } from "../../utils/neo-validator";
import { Order } from "../../models/neo4j/order";

export class InvoiceService extends GenericService<typeof Invoice> {
  constructor(protected model: typeof Invoice) {
    super(model);
  }

  async create(body: any): Promise<CustomResult<typeof Invoice>> {
    try {
      const orderObject = await Order.find(body.order_id);
      if (!orderObject) {
        return new CustomResult(StatusCode.BadRequest);
      }

      const invoice = await this.model.create(body);

      invoice.relateTo(orderObject, "has_order");

      return new CustomResult(
        StatusCode.Created,
        invoice.properties() as typeof Invoice
      );
    } catch (error) {
      console.error(error);
      return new CustomResult(StatusCode.ServerError);
    }
  }

  async update(id: string, body: any): Promise<CustomResult<typeof Invoice>> {
    if (isValidNeoId(id)) {
      try {
        const invoiceToEdit = await this.model.find(id);

        if (invoiceToEdit) {
          const orderObject = await Order.find(body.order_id);
          if (!orderObject) {
            return new CustomResult(StatusCode.BadRequest);
          }

          const invoice = await invoiceToEdit.update(body);

          invoice.relateTo(orderObject, "has_order");

          return new CustomResult(
            StatusCode.Created,
            invoice.properties() as typeof Invoice
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
