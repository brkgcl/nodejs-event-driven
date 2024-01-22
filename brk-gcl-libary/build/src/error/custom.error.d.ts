import { BaseError } from './base.error';
import { ValidationError as ExpressValidationError } from "express-validator";
import { ValidationError as JoiValidationError } from "joi";
export declare class BadRequestError extends BaseError {
    message: string;
    statusCode: number;
    constructor(message?: string);
    serializeErrors(): {
        message: string;
    }[];
}
export declare class DatabaseConnectionError extends BaseError {
    statusCode: number;
    reason: string;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
export declare class NotAuthorizedError extends BaseError {
    statusCode: number;
    constructor(message?: string);
    serializeErrors(): {
        message: string;
    }[];
}
export declare class NotFoundError extends BaseError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
export declare class RequestValidationError extends BaseError {
    errors: ExpressValidationError[];
    statusCode: number;
    constructor(errors: ExpressValidationError[]);
    serializeErrors(): ({
        message: any;
        field: string;
    } | {
        message: any;
        field?: undefined;
    })[];
}
export declare class CustomValidationError extends Error {
    errors: JoiValidationError[];
    statusCode: number;
    constructor(errors: JoiValidationError[]);
    serializeErrors(): ({
        message: string;
        field: (string | number)[];
    } | {
        message: string;
        field?: undefined;
    })[];
}
