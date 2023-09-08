import httpStatus from "http-status";
import {catchAsync} from "../../../shared/catchAsync";
import {sendResponse} from "../../../shared/sendResponse";
import {IOrder} from "./order.interface";
import {Request, Response} from "express";
import {createOrderService, getAllOrdersService, getSingleOrderService} from "./order.service";

export const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = req.body;
  const newOrder = await createOrderService(order);
  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created successfully!",
    data: newOrder,
  });
});

//get all orders
export const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await getAllOrdersService(req?.user);
  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders retrieved successfully!",
    data: orders,
  });
});
//get single order
export const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const order = await getSingleOrderService(id);
  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order's information retrieved successfully!",
    data: order,
  });
});
