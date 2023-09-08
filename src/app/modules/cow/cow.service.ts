import httpStatus from "http-status";
import {ApiError} from "../../../handleErrors/ApiError";
import {ICow, ICowFilters} from "./cow.interface";
import {Cow} from "./cow.model";
import {IGenericPaginationResponse, IPaginationOptions} from "../../../interfaces/pagination";
import {calculatePagination} from "../../../shared/paginationHelper";
import {SortOrder} from "mongoose";
import {cowSearchableFields} from "./cow.constant";
import {User} from "../user/user.model";

// create cow
export const createCowService = async (cow: ICow): Promise<ICow | null> => {
  //checking the seller is exist or not and the role is seller or not
  const seller = await User.findById({_id: cow.seller});
  if (!seller) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This seller doesn't exist");
  }
  if (!(seller.role === "seller")) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Given id is not a seller id.Please put a seller id!");
  }
  //creating cow
  const newCow = await Cow.create(cow);
  if (!newCow) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create cow!");
  }
  return newCow;
};
//get all cows
export const getAllCowsService = async (filters: ICowFilters, paginationOptions: IPaginationOptions): Promise<IGenericPaginationResponse<ICow[]>> => {
  //pagination
  const {page, limit, skip, sortBy, sortOrder} = calculatePagination(paginationOptions);
  const sortConditions: {[key: string]: SortOrder} = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  //search
  const {searchTerm, ...filtersData} = filters;
  const andconditions = [];
  if (searchTerm) {
    andconditions.push({
      $or: cowSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  //filtering
  if (Object.keys(filtersData).length > 0) {
    andconditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        if (field === "minPrice") {
          return {price: {$gte: value}};
        } else if (field === "maxPrice") {
          return {price: {$lte: value}};
        } else {
          return {[field]: value};
        }
      }),
    });
  }
  const whereCondition = andconditions?.length > 0 ? {$and: andconditions} : {};
  const cows = await Cow.find(whereCondition).sort(sortConditions).skip(skip).limit(limit);
  const count = await Cow.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      count,
    },
    data: cows,
  };
};

//get a single cow
export const getSingleCowService = async (id: string): Promise<ICow | null> => {
  const cow = await Cow.findById({_id: id}).populate("seller");
  return cow;
};

//update cow
export const updateCowService = async (id: string, payload: Partial<ICow>): Promise<ICow | null> => {
  const isExist = await Cow.findById({_id: id});
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Cow not found!");
  }

  const result = await Cow.findOneAndUpdate({_id: id}, payload, {
    new: true,
  });
  return result;
};

//delete cow
export const deleteCowService = async (id: string): Promise<ICow | null> => {
  const isExist = await Cow.findById({_id: id});
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Cow not found!");
  }
  const result = await Cow.findByIdAndDelete(id);
  return result;
};
