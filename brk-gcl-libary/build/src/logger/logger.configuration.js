"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const logger_formatter_1 = require("./logger.formatter");
// service name required , control or alternative name ||
const _developmentEnvironment = process.env.NODE_ENV === 'development' ? 1 : 0;
winston_1.default.loggers.add('service', {
    level: _developmentEnvironment ? 'trace' : 'error',
    levels: logger_formatter_1.customLevels.levels,
    defaultMeta: {
        service: process.env.SERVICE_NAME,
    },
    format: logger_formatter_1.fileFormatter,
    transports: _developmentEnvironment
        ? [new winston_1.default.transports.Console({ format: logger_formatter_1.consoleFormatter })]
        : [
            new winston_1.default.transports.File({
                level: 'trace',
                dirname: './log',
                filename: 'combined.log',
            }),
            new winston_1.default.transports.File({
                level: 'error',
                dirname: './log',
                filename: 'error.log',
            }),
        ],
});
/**
 * [
    new winston.transports.File({
      dirname: './log',
      filename: 'service.log',
    }),
    new winston.transports.Console({
      format: consoleFormatter,
    }),
  ],
 */
winston_1.default.loggers.add('request', {
    level: 'http',
    defaultMeta: {
        service: process.env.SERVICE_NAME,
    },
    format: winston_1.default.format.json(),
    transports: _developmentEnvironment
        ? [
            new winston_1.default.transports.Console({
                format: logger_formatter_1.requestConsoleFormatter,
            }),
        ]
        : [
            new winston_1.default.transports.File({
                level: 'http',
                dirname: './log',
                filename: 'request.log',
            }),
        ],
});
exports.logger = winston_1.default.loggers.get('service');
exports.requestLogger = winston_1.default.loggers.get('request');
