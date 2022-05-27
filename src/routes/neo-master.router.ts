import express from "express";
import RoleRouter from "./neo4j/role.routes";
import StatusRouter from './neo4j/status.routes'

const router = express.Router();

router.use("/admin/roles/", RoleRouter);
router.use("/admin/statuses/", StatusRouter);

export default router;
