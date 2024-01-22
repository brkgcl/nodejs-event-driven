"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlingMiddleware = void 0;
const base_error_1 = require("../error/base.error");
const logger_configuration_1 = require("../logger/logger.configuration");
const ErrorHandlingMiddleware = (err, req, res, next) => {
    if (err instanceof base_error_1.BaseError)
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    logger_configuration_1.logger.error(err);
    res.status(400).send({
        errors: [{ message: 'Something went wrong' }],
    });
};
exports.ErrorHandlingMiddleware = ErrorHandlingMiddleware;
