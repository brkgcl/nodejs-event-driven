"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticatedMiddleware = void 0;
const custom_error_1 = require("../error/custom.error");
const isAuthenticatedMiddleware = (req, res, next) => {
    if (!req.isAuthenticated())
        throw new custom_error_1.NotAuthorizedError('giriş yapın');
    next();
};
exports.isAuthenticatedMiddleware = isAuthenticatedMiddleware;
