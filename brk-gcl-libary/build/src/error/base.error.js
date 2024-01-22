"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, BaseError.prototype);
    }
}
exports.BaseError = BaseError;
