import express from "express";

import AccountingRouter from "./mongo/accounting.routes"

const router = express.Router();

router.use("/reports", AccountingRouter)

export default router;
