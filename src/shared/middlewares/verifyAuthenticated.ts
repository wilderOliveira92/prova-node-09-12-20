import AppError from "../errors/appError";
import { NextFunction, Request } from "express";
import { verify } from "jsonwebtoken";

import authConfig from '../../config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function verifyAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) : void {
  
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError('Token is missing.', 401);
  }

  const [, token] = authHeader.split(' ');
  
  try {

    const decoded = verify(token, authConfig.jwt.secret);
    const {sub} = decoded as ITokenPayload;

    request.user = {
      id: sub
    }
    
    return next();
  } catch (error) {
      throw new AppError('Token is invalid.', 401);
  }
}