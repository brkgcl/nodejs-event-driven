import winston, { format } from 'winston';

export const customLevels = {
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

export const fileFormatter = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS',
  }),
  format.printf((data) => {
    return `{"level": "${data.level.toUpperCase()}", "timestamp": "${
      data.timestamp
    }", "action": "${data.action}", "message": "${data.message}"}`;
  })
);

//!!! warning  level ı true yapınca timestamp ve actionlar gidiyor sebebine bak
export const consoleFormatter = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS',
  }),
  winston.format.printf((data) => {
    return `[${
      data.timestamp
    }] [${data.level.toUpperCase()}] [${process.env.SERVICE_NAME?.toUpperCase()} -> ${
      data.action
    }] : ${data.message}`;
  }),
  winston.format.colorize({
    all: true,
    colors: customLevels.colors,
  })
);

export const requestConsoleFormatter = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS',
  }),
  winston.format.printf((data) => {
    return `[${data.level.toUpperCase()}] : [${data.method}] [${data.status}] ${
      data.url
    } [${data.response_time}] [${data.timestamp}] : "${data.message}"`;
  }),
  winston.format.colorize({
    all: true,
    colors: customLevels.colors,
  })
);
