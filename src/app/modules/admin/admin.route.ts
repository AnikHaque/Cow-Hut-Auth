import express from "express";
import {validateRequest} from "../../middlewares/validateRequest";
import {createAdminZodSchema} from "./admin.validation";
import {createAdmin, loginAdmin} from "./admin.controller";
import {loginZodSchema} from "../auth/auth.validation";

const router = express.Router();
//
router.post("/create-admin", validateRequest(createAdminZodSchema), createAdmin);
router.post("/login", validateRequest(loginZodSchema), loginAdmin);


export const AdminRoutes = router;
