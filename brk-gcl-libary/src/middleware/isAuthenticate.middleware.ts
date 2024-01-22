import { Express, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { NotAuthorizedError } from '../error/custom.error';

export const isAuthenticatedMiddleware = (req:Request, res:Response, next:NextFunction) => {
    if(!req.isAuthenticated())  throw new NotAuthorizedError('giriş yapın');
    next();
}