import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { maillerRoutes } from './routes/email.routes';
import { config } from './config/index.config';
import {
  ErrorHandlingMiddleware,
  NotFoundError,
  logger,
  morganMiddleware,
} from 'brk-gcl-libary';
import { eventListener } from './events/event.listener';
import 'express-async-errors';
class Server {
  public app: Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config(): void {
    this.app.set('port', config.PORT);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(morganMiddleware);
  }

  public routes(): void {
    this.app.use(maillerRoutes(express.Router()));
    this.app.all('*', async (req: Request, res: Response) => {
      throw new NotFoundError();
    });

    this.app.use(ErrorHandlingMiddleware);
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      logger.info({
        action: 'server',
        message: `server started at ${this.app.get('port')}`,
      });

      process.nextTick(() => {
        setTimeout(eventListener, 40000);
      });
    });
  }
}

const server = new Server();
server.start();
