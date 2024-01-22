import { BaseError } from './base.error';
import {
  ValidationError as ExpressValidationError,
  ExpressValidator,
  validationResult,
} from "express-validator";
import { ValidationError as JoiValidationError } from "joi";
export class BadRequestError extends BaseError {
  statusCode = 400;

  constructor(public message: string = 'bad request') {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export class DatabaseConnectionError extends BaseError {
  statusCode = 500;
  reason = 'Error connecting to database';

  constructor() {
    super('Error connecting to db');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}

export class NotAuthorizedError extends BaseError {
  statusCode = 401;

  constructor(message: string = 'Not authorized') {
    super(message);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export class InvalodTokenError extends BaseError {
  statusCode = 402;
  constructor(message: string = "invalid token") {

     super(message);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export class NotFoundError extends BaseError {
  statusCode = 404;

  constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not Found' }];
  }
}



export class RequestValidationError extends BaseError {
  statusCode = 400;

  constructor(public errors: ExpressValidationError[]) {
    super("Invalid request parameters");
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  
  serializeErrors() {
    return this.errors.map((err) => {
      console.log('seriliaze error :',err);
      
      if (err.type === "field") {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
  }

}

export class CustomValidationError extends Error {
  statusCode = 400;

  constructor(public errors: JoiValidationError[]) {
    super("Invalid request parameters");
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

    return this.errors.map((err,i) => {
      console.log('THİS.ERR.MAP :', err);
      
      if(err instanceof JoiValidationError){
        return {message: err.details[i].message, field: err.details[i].path}
      }
      return {message: 'someting went wrong dsds'}
 
    });
    
  }
}

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