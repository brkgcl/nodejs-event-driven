"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestConsoleFormatter = exports.consoleFormatter = exports.fileFormatter = exports.customLevels = void 0;
const winston_1 = __importStar(require("winston"));
exports.customLevels = {
    levels: {
        http: 6,
        trace: 5,
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        fatal: 0,
    },
    colors: {
        http: 'blue',
        trace: 'white',
        debug: 'green',
        info: 'green',
        warn: 'yellow',
        error: 'red',
        fatal: 'red',
    },
};
exports.fileFormatter = winston_1.default.format.combine(winston_1.default.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS',
}), winston_1.format.printf((data) => {
    return `{"level": "${data.level.toUpperCase()}", "timestamp": "${data.timestamp}", "action": "${data.action}", "message": "${data.message}"}`;
}));
//!!! warning  level ı true yapınca timestamp ve actionlar gidiyor sebebine bak
exports.consoleFormatter = winston_1.default.format.combine(winston_1.default.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS',
}), winston_1.default.format.printf((data) => {
    var _a;
    return `[${data.timestamp}] [${data.level.toUpperCase()}] [${(_a = process.env.SERVICE_NAME) === null || _a === void 0 ? void 0 : _a.toUpperCase()} -> ${data.action}] : ${data.message}`;
}), winston_1.default.format.colorize({
    all: true,
    colors: exports.customLevels.colors,
}));
exports.requestConsoleFormatter = winston_1.default.format.combine(winston_1.default.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS',
}), winston_1.default.format.printf((data) => {
    return `[${data.level.toUpperCase()}] : [${data.method}] [${data.status}] ${data.url} [${data.response_time}] [${data.timestamp}] : "${data.message}"`;
}), winston_1.default.format.colorize({
    all: true,
    colors: exports.customLevels.colors,
}));
