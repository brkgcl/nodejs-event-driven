import winston from 'winston';
import {
  consoleFormatter,
  customLevels,
  fileFormatter,
  requestConsoleFormatter,
} from './logger.formatter';

// service name required , control or alternative name ||

const _developmentEnvironment = process.env.NODE_ENV === 'development' ? 1 : 0;

winston.loggers.add('service', {
  level: _developmentEnvironment ? 'trace' : 'error',
  levels: customLevels.levels,
  defaultMeta: {
    service: process.env.SERVICE_NAME,
  },
  format: fileFormatter,
  transports: _developmentEnvironment
    ? [new winston.transports.Console({ format: consoleFormatter })]
    : [
        new winston.transports.File({
          level: 'trace',
          dirname: './log',
          filename: 'combined.log',
        }),
        new winston.transports.File({
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

winston.loggers.add('request', {
  level: 'http',
  defaultMeta: {
    service: process.env.SERVICE_NAME,
  },
  format: winston.format.json(),
  transports: _developmentEnvironment
    ? [
        new winston.transports.Console({
          format: requestConsoleFormatter,
        }),
      ]
    : [
        new winston.transports.File({
          level: 'http',
          dirname: './log',
          filename: 'request.log',
        }),
      ],
});

export const logger = winston.loggers.get('service');
export const requestLogger = winston.loggers.get('request');
