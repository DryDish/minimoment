import express from "express";
import { Frame, FrameInterface } from "../../models/mongo/frame";
import { PaperType, PaperTypeInterface } from "../../models/mongo/paper-type";
import { SizeInterface } from "../../models/mongo/size";
import { GenericService } from "../../services/mongo/generic-model.service";
import { CustomResult, StatusCode } from "../../utils/custom-result.utils";
import { resultHandler } from "../../utils/response-handler.utils";

const router = express.Router();
const frameService = new GenericService<FrameInterface>(Frame);
const paperTypeService = new GenericService<PaperTypeInterface>(PaperType);

router.get("/", async (_, res) => {
  const frameResult = await frameService.findAll();
  const paperTypeResult = await paperTypeService.findAll();
  const sizeResult: SizeInterface[] = [];


  if (frameResult.status === StatusCode.Success && paperTypeResult.status === StatusCode.Success) {
    const uniqueSizes: Set<string> = new Set();

    frameResult.entity?.forEach(frame => uniqueSizes.add(JSON.stringify(frame.size)));
    paperTypeResult.entity?.forEach(paperType => uniqueSizes.add(JSON.stringify(paperType.size)));

    uniqueSizes.forEach(size => sizeResult.push(JSON.parse(size)));
  }

  const result: CustomResult<SizeInterface[]> = new CustomResult<SizeInterface[]>(StatusCode.Success, sizeResult);
  resultHandler("Sizes", result, res);
});

export default router;
