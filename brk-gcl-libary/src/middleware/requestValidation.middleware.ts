/**
 * 
 */
import { Request, Response, NextFunction } from "express";
import { validationResult,Schema,ValidationChain } from "express-validator";
import { RequestValidationError } from "../error/custom.error";

// export const validateRequest = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     throw new RequestValidationError(errors.array());
//   }

//   next();
// };

export const validationRequest = (schema:ValidationChain[]) => {
  return async (req:Request, res:Response, next:NextFunction) => {
    await Promise.all(schema.map((validator) => validator.run(req)));

    const errors = validationResult(req);
    if(!errors.isEmpty()) throw new RequestValidationError(errors.array());
    
    next();
  }
}


/*

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};

şeklindeki validasyonu 

export const validationSchema = {
  login: [
    body("email")
      .notEmpty().withMessage("Email must be required")
      .isEmail().withMessage('Email must be valid'),

    body("password")
      .notEmpty().withMessage("Password must be required")
      .isString()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password is 6-20 character"),
  ],
}

validateRequest(validationSchema.login) i parametre alıp validasyon yapabilecek şekle dönüştürmek istiyorum

*/