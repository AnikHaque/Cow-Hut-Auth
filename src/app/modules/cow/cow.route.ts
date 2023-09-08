import express from "express";
import {validateRequest} from "../../middlewares/validateRequest";
import {createCow, deleteCow, getAllCows, getSingleCow, updateCow} from "./cow.controller";
import {createCowZodSchema, updateCowZodSchema} from "./cow.validation";
import {auth} from "../../middlewares/auth";
import {ENUM_USER_ROLE} from "../../../enums/user";

const router = express.Router();
const document = "cow";
//
router.post("/", validateRequest(createCowZodSchema), auth(document, ENUM_USER_ROLE.SELLER), createCow);
router.get("/:id", auth(document, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN), getSingleCow);
router.delete("/:id", auth(document, ENUM_USER_ROLE.SELLER), deleteCow);
router.patch("/:id", validateRequest(updateCowZodSchema), auth(document, ENUM_USER_ROLE.SELLER), updateCow);
router.get("/", auth(document, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN), getAllCows);
//
export const CowRoutes = router;
