import express from "express";
import {validateRequest} from "../../middlewares/validateRequest";
import {deleteUser, getAllUsers, getMyProfile, getSingleUser, updateMyProfile, updateUser} from "./user.controller";
import {updateUserZodSchema} from "./user.validation";
import {auth} from "../../middlewares/auth";
import {ENUM_USER_ROLE} from "../../../enums/user";

const router = express.Router();
const document = "user";
//
router.get("/my-profile", auth(document, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER), getMyProfile);
router.patch("/my-profile", auth(document, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER), updateMyProfile);
router.get("/:id", auth(document, ENUM_USER_ROLE.ADMIN), getSingleUser);
router.delete("/:id", auth(document, ENUM_USER_ROLE.ADMIN), deleteUser);
router.patch("/:id", validateRequest(updateUserZodSchema), auth(document, ENUM_USER_ROLE.ADMIN), updateUser);
router.get("/", auth(document, ENUM_USER_ROLE.ADMIN), getAllUsers);
//
export const UserRoutes = router;
