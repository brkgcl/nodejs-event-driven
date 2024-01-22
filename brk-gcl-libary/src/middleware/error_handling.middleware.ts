import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../error/base.error';
import { logger } from '../logger/logger.configuration';

export const ErrorHandlingMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseError)
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    

  logger.error(err);

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
