import express from "express";
import {validateRequest} from "../../middlewares/validateRequest";
import {createOrder, getAllOrders, getSingleOrder} from "./order.controller";
import {createOrderZodSchema} from "./order.validation";
import {auth} from "../../middlewares/auth";
import {ENUM_USER_ROLE} from "../../../enums/user";

const router = express.Router();
const document = "order";
//
router.get("/:id", auth(document, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN), getSingleOrder);
router.post("/", validateRequest(createOrderZodSchema), auth(document, ENUM_USER_ROLE.BUYER), createOrder);

router.get("/", auth(document, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN), getAllOrders);
//
export const OrderRoutes = router;
