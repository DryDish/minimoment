import express from "express";
import RoleRouter from "./neo4j/role.routes";
import StatusRouter from './neo4j/status.routes'
import ContactInfoRouter from './neo4j/contact-info.routes'
import PictureRouter from './neo4j/pictures.routes'

const router = express.Router();

router.use("/admin/roles/", RoleRouter);
router.use("/admin/statuses/", StatusRouter);
router.use("/contact-info", ContactInfoRouter);
router.use("/pictures", PictureRouter);

export default router;
