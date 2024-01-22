import morgan, { FormatFn } from 'morgan';
import { requestLogger } from '../logger/logger.configuration';
import { Request, Response } from 'express';

interface MorganTokens {
  method: (req: Request, res: Response) => string;
  url: (req: Request, res: Response) => string;
  status: (req: Request, res: Response) => string;
  res: (req: Request, res: Response, format: string) => string;
  'response-time': (req: Request, res: Response) => string;
  // Diğer belirteçleri ekleyebilirsiniz
}

morgan.token('device', (req: Request, res: Response) => {
  return req.headers['user-agent']; // user-agent bilgisini alır
});

export const morganMiddleware = morgan(
  function (tokens, req: Request, res: Response) {
    return JSON.stringify({
      remote_addr: tokens['remote-addr'](req, res),
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)!),
      content_length: tokens.res(req, res, 'content-length'),
      response_time: Number.parseFloat(tokens['response-time'](req, res)!),
      device: tokens.device(req, res),
    });
  },
  {
    stream: {
      write: (message) => {
        const data = JSON.parse(message);
        requestLogger.http('incoming-request', data);
      },
    },
  }
);

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
