/**
 *
 */
import { Request, Response, NextFunction } from 'express';
import { AccessToken } from '../utils/token/genarate.token';
import { BadRequestError, NotAuthorizedError } from 'brk-gcl-libary';

export const authorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @DSC get access token in cookie
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // @DSC registered user check
    if (!req.isAuthenticated())
      return next(new NotAuthorizedError("giriş yapın"));

    // @DSC token validity check (rediscl, cookie ...)
    if (token) {
      if (!(await AccessToken.verify(token, req.user!)))
        return next(new NotAuthorizedError("token credantial"));
    }

    next();
  } catch (error) {
    throw new BadRequestError();
  }
};
