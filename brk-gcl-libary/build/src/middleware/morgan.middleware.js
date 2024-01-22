"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganMiddleware = void 0;
const morgan_1 = __importDefault(require("morgan"));
const logger_configuration_1 = require("../logger/logger.configuration");
morgan_1.default.token('device', (req, res) => {
    return req.headers['user-agent']; // user-agent bilgisini alır
});
exports.morganMiddleware = (0, morgan_1.default)(function (tokens, req, res) {
    return JSON.stringify({
        remote_addr: tokens['remote-addr'](req, res),
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: Number.parseFloat(tokens.status(req, res)),
        content_length: tokens.res(req, res, 'content-length'),
        response_time: Number.parseFloat(tokens['response-time'](req, res)),
        device: tokens.device(req, res),
    });
}, {
    stream: {
        write: (message) => {
            const data = JSON.parse(message);
            logger_configuration_1.requestLogger.http('incoming-request', data);
        },
    },
});
// const morganMiddleware = morgan(
//   function (tokens, req, res) {
//     return JSON.stringify({
//       method: tokens.method(req, res),
//       url: tokens.url(req, res),
//       status: Number.parseFloat(tokens.status(req, res)),
//       content_length: tokens.res(req, res, 'content-length'),
//       response_time: Number.parseFloat(tokens['response-time'](req, res)),
//     });
//   },
//   {
//     stream: {
//       // Configure Morgan to use our custom logger with the http severity
//       write: (message) => {
//         const data = JSON.parse(message);
//         logger.http(`incoming-request`, data);
//       },
//     },
//   }
// );
