import jwt, {JwtPayload, Secret} from "jsonwebtoken";

export const createToken = (payload: object, secret: Secret, options: object): string => {
  return jwt.sign(payload, secret, options);
};
export const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
