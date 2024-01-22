/**
 *
 */
import express, { Express, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { config } from './config/index.config';
import {
  BadRequestError,
  morganMiddleware,
  ErrorHandlingMiddleware,
  NotFoundError,
  DatabaseConnectionError,
  logger,
} from 'brk-gcl-libary';
import passport, { DoneCallback} from 'passport';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';
import { GoogleStrategy } from './strategy/google.stragey';
import { authenticationRouter } from './routes/authentication.routes';
import 'express-async-errors';
import { User } from './model/user.model';
import { FacebookStrategy } from './strategy/facebook.strategy';
import {
  LocalLoginStrategy,
  LocalRegisterStrategy,
} from './strategy/local.strategy';
import { userRouter } from './routes/user.routes';
import {
  RequestUserI,
  generateUserToSessionObject,
} from './utils/helper/sessionUser.parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import "express-async-errors";


declare module 'express-serve-static-core' {
    interface Request {
        user?: RequestUserI;
    }
}


class Server {
    public app: Express;
    public passport: passport.PassportStatic;

    constructor() {
      this.app = express();
      this.passport = passport;
      this.passportConfig();
      this.config();
      this.routes();
      this.mongo();
      this.setupConnectionListeners();
    }

    public config(): void {
        this.app.set('port', config.PORT);
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        this.app.use(
            cors({
                origin: "http://localhost:3000",
                credentials: true,
                optionsSuccessStatus: 200,
            })
        );
        this.app.use(
          session({
                secret: process.env.JWT_KEY!,
                resave: false,
                name: "customSession",
                saveUninitialized: false,
          })
        );
        this.app.use(flash());
        this.app.use(morganMiddleware);
        this.app.use(passport.session());
        this.app.use(passport.initialize());
        // this.app.set('trust proxy', true);
    }

    public passportConfig(): void {
        this.passport.serializeUser(async (user: any, done: DoneCallback) => {
            done(null, user.id);
        });

        this.passport.deserializeUser(async function (user: any, done) {
            await User.findById(user)
                .then(async (userdata) => {
                    if (userdata) return done(null, generateUserToSessionObject(userdata));
                    else return done(null, false);
                })
                .catch((err) => {
                    return new BadRequestError('someting went wrong');
                });
        });
        this.passport.use('google', GoogleStrategy);
        this.passport.use('facebook', FacebookStrategy);
        this.passport.use('register', LocalRegisterStrategy);
        this.passport.use('login', LocalLoginStrategy);
    }

    public routes() {
        this.app.use('/auth', authenticationRouter(express.Router()));
        this.app.use('/user', userRouter(express.Router()));
        this.app.all('*', async (req: Request, res: Response) => {
            throw new NotFoundError();
        });
        this.app.use(ErrorHandlingMiddleware);
    }

    private setupConnectionListeners() {
        const connection = mongoose.connection;

        connection.on('connected', () => {
            logger.info({
                action: 'database',
                message: 'database connection successfull',
            });
        });

        connection.on('reconnected', () => {
            logger.warn({
                action: 'database',
                message: 'Mongo Connection Reestablished',
            });
        });

        connection.on('disconnected', () => {
            logger.warn({
                action: "database",
                message:
                  "Mongo Connection Disconnected, Trying to reconnect to Mongo ...",
            });
            setTimeout(() => {
                mongoose.connect(config.mongoUrı);
            }, 3000);
        });

        connection.on('close', () => {
            logger.warn({ action: 'database', message: 'Mongo Connection Closed' });
        });

        connection.on('error', (error: Error) => {
            logger.error({
                action: 'database',
                message: `Mongo Connection ERROR: ${error}`,
            });
        });
    }

    private mongo() {
        const run = async () => {
            await mongoose.connect(config.mongoUrı);
            this.setupConnectionListeners();
        };
        run().catch((error) => {
            throw new DatabaseConnectionError();
        });
    }

    public start(): void {
        this.app.listen(this.app.get('port'), () => {
            logger.info({
                action: 'server',
                message: `server started at ${this.app.get('port')}`,
            });
        });
    }
}

const server = new Server();
server.start();
