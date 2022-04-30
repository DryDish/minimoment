import express from "express";
import { Frame } from "../models/frame";
import { sendErrorResponse } from "../utils/responses.util";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const frameList = await Frame.findAll();
    res.status(200).send(frameList);
  } catch (error) {
    sendErrorResponse(res, "Unable to retrieve frames.", 500, error);
  }
});

export default router;
