import {NextFunction, Request, Response} from "express";
import httpStatus from "http-status";
import {Secret} from "jsonwebtoken";
import {ApiError} from "../../handleErrors/ApiError";
import {verifyToken} from "../../shared/jwtHelpers";
import config from "../../config";
import {validateCowSeller} from "../modules/cow/cow.validation";
import {validateOrder} from "../modules/order/order.validation";

export const auth =
  (document: string, ...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let verifiedUser = null;
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      //verify token
      verifiedUser = verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser;
      //   role guard
      const {userId, role} = verifiedUser;
      if (roles.length > 0 && !roles.includes(role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Request Forbidden");
      }
      //cow seller validation
      if (document === "cow" && req.params.id) {
        const validateSeller = await validateCowSeller(req.params.id, userId);
        if (!validateSeller) {
          throw new ApiError(httpStatus.FORBIDDEN, "Request Forbidden. You can't access this cow!");
        }
      }
      //seller and buyer of orders validation
      if (document === "order" && req.params.id) {
        const validateCowOrder = await validateOrder(req.params.id, userId);
        if (!validateCowOrder) {
          throw new ApiError(httpStatus.FORBIDDEN, "Request Forbidden. You can't access this order!");
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  };
