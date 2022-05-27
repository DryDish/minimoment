import express from "express";
import RoleRouter from "./neo4j/role.routes";

const router = express.Router();

router.use("/admin/roles/", RoleRouter);

export default router;
