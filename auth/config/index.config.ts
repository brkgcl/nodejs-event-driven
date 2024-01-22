import { EventPublisher, RedisConfig } from 'brk-gcl-libary';
import dotenv from 'dotenv';
import { CookieOptions } from 'express';
import path from 'path';

dotenv.config({
    path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`),
});

// @DSC config setuo
export const config = {
  PORT: process.env.PORT || 3002,
  baseURL: `http://localhost`,
  successRedirect: "/auth/get-access-token",
  callbackSuccessRedirect: `${process.env.CLIENT_URI}/auth/callback`,
  failureRedirect: "/",
  mongoUrı: process.env.MONGODB_URI || "localhost:8024",
  rabbitmqUrı: process.env.RABBITMQ_URI || "amqp://localhost",
  token: {
    accessToken: {
      secretKey: process.env.JWT_KEY || "access-token-secret",
      expires: 30,
    },
    refleshToken: {
      secretKey: process.env.JWT_KEY || "reflesh-token-secret",
      expires: 60,
    },
  },
  redis: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_PORT) || 6379,
  },
  // redis: {
  //   host: "127.0.0.1",
  //   port: 6379,
  // },
};

// @DESC redis connection
export const redisCli = new RedisConfig(config.redis.host, config.redis.port);

// @DSC rabbitmq connection
export const prodecur = new EventPublisher(config.rabbitmqUrı);


// @DSC cookie token storage options
export const accesTokenCookieOptions: CookieOptions = {
    expires: new Date(
        Date.now() + Number(config.token.accessToken.expires) * 60 * 100
    ),
    maxAge: Number(config.token.accessToken.expires) * 60 * 100,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production' ? true : false,
};

export const refleshTokenCookieOptions: CookieOptions = {
    expires: new Date(
        Date.now() + Number(config.token.refleshToken.expires) * 60 * 100
    ),
    maxAge: Number(config.token.refleshToken.expires) * 60 * 100,
    httpOnly: true,
    sameSite: 'lax',
};
