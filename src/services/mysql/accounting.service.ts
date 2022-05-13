import { MonthlyReport } from "../../models/mysql/monthly-report";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";

export const AccountingService = {
  findAll: async (): Promise<CustomResult<MonthlyReport[]>> => {
    try {
      const result = await MonthlyReport.findAll();
      return new CustomResult(StatusCode.Success, result);
    } catch (error) {
      return new CustomResult(StatusCode.ServerError);
    }
  },
};
