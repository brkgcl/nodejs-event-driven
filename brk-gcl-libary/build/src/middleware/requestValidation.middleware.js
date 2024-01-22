"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationRequest = void 0;
const express_validator_1 = require("express-validator");
const custom_error_1 = require("../error/custom.error");
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
const validationRequest = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield Promise.all(schema.map((validator) => validator.run(req)));
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            throw new custom_error_1.RequestValidationError(errors.array());
        next();
    });
};
exports.validationRequest = validationRequest;
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
