import {Request, Response} from "express";
import {catchAsync} from "../../../shared/catchAsync";
import {sendResponse} from "../../../shared/sendResponse";
import httpStatus from "http-status";
import {ICow} from "./cow.interface";
import {createCowService, deleteCowService, getAllCowsService, getSingleCowService, updateCowService} from "./cow.service";
import {paginationFields} from "../../../constant/pagination";
import {pick} from "../../../shared/pick";
import {cowFilterableFields} from "./cow.constant";
//create cow
export const createCow = catchAsync(async (req: Request, res: Response) => {
  const cow = req.body;

  const newCow = await createCowService(cow);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow created successfully!",
    data: newCow,
  });
});
//get all cows
export const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const cows = await getAllCowsService(filters, paginationOptions);
  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cows retrieved successfully!",
    meta: cows.meta,
    data: cows.data,
  });
});
//get a single cow
export const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const cow = await getSingleCowService(id);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow retrieved successfully!",
    data: cow,
  });
});
//update cow
export const updateCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req?.body;
  const updatedCow = await updateCowService(id, updatedData);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow updated successfully!",
    data: updatedCow,
  });
});
//delete cow
export const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const cow = await deleteCowService(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow deleted successfully!",
    data: cow,
  });
});
