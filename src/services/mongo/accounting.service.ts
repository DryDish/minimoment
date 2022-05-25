import {
  MonthlyReport,
  MonthlyReportInterface,
} from "../../models/mongo/monthly-report";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";

export class AccountingService {
  async findAll(): Promise<CustomResult<MonthlyReportInterface[]>> {
    try {
      const result = await MonthlyReport.find();
      return new CustomResult(StatusCode.Success, result);
    } catch (error) {
      console.error(error);
      return new CustomResult(StatusCode.ServerError);
    }
  }
}
