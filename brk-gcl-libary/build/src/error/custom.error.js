"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidationError = exports.RequestValidationError = exports.NotFoundError = exports.NotAuthorizedError = exports.DatabaseConnectionError = exports.BadRequestError = void 0;
const base_error_1 = require("./base.error");
const joi_1 = require("joi");
class BadRequestError extends base_error_1.BaseError {
    constructor(message = 'bad request') {
        super(message);
        this.message = message;
        this.statusCode = 400;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.BadRequestError = BadRequestError;
class DatabaseConnectionError extends base_error_1.BaseError {
    constructor() {
        super('Error connecting to db');
        this.statusCode = 500;
        this.reason = 'Error connecting to database';
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
class NotAuthorizedError extends base_error_1.BaseError {
    constructor(message = 'Not authorized') {
        super(message);
        this.statusCode = 401;
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
class NotFoundError extends base_error_1.BaseError {
    constructor() {
        super('Route not found');
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors() {
        return [{ message: 'Not Found' }];
    }
}
exports.NotFoundError = NotFoundError;
class RequestValidationError extends base_error_1.BaseError {
    constructor(errors) {
        super("Invalid request parameters");
        this.errors = errors;
        this.statusCode = 400;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map((err) => {
            console.log('seriliaze error :', err);
            if (err.type === "field") {
                return { message: err.msg, field: err.path };
            }
            return { message: err.msg };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
class CustomValidationError extends Error {
    constructor(errors) {
        super("Invalid request parameters");
        this.errors = errors;
        this.statusCode = 400;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, CustomValidationError.prototype);
    }
    serializeErrors() {
        // if(this.errors instanceof JoiValidationError){
        //   return this.errors.map((err,i) => {
        //     return { message: err.message, field: err.details[i].path}
        //   });
        //   return {message: 'someting went wrong'};
        // }
        return this.errors.map((err, i) => {
            console.log('THİS.ERR.MAP :', err);
            if (err instanceof joi_1.ValidationError) {
                return { message: err.details[i].message, field: err.details[i].path };
            }
            return { message: 'someting went wrong dsds' };
        });
    }
}
exports.CustomValidationError = CustomValidationError;
// export class JoiValidationErrors extends Error {
//   statusCode = 400;
//   constructor(public errors: JoiValidationError[]) {
//     super("Joi validation error");
//     Object.setPrototypeOf(this, JoiValidationError.prototype);
//   }
//   serializeErrors() {
//     return this.errors.map((err) => {
//       if (err.type === "string.min") {
//         return {
//           message: `Minimum length is ${err.context.limit}`,
//           field: err.context.key,
//         };
//       } else if (err.type === "string.email") {
//         return { message: `Invalid email format`, field: err.context.key };
//       }
//       // Diğer hata tipleri için uygun mesajları döndürebilirsiniz
//       return { message: err.message };
//     });
//   }
// }
/*
class CustomValidationError {
  constructor(
    public type: any,
    public msg: string,
    public nestedErrors: any[] = []
  ) {}
}

function convertJoiErrorsToCustomValidationErrors(
  errors: JoiValidationError[]
): CustomValidationError[] {
  return errors.map((error: JoiValidationError,i) => {
    console.log('convert error:',error);
    
    return new CustomValidationError(
      'field',
      error.details[i].message,
      error.details[i].path,
    );
  });
}
*/ 
