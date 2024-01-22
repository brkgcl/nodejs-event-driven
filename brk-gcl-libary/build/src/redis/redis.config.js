"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisConfig = void 0;
/**
 *
 */
const redis_1 = require("redis");
const logger_configuration_1 = require("../logger/logger.configuration");
class RedisConfig {
    constructor(host, port, password) {
        this.host = host;
        this.port = port;
        this.client = (0, redis_1.createClient)({
            socket: {
                host: this.host,
                port: this.port,
            },
        });
        this.client.on('error', (err) => logger_configuration_1.logger.error(err));
        this.client.on('connect', () => logger_configuration_1.logger.info({
            action: 'redis',
            message: `redis run at ${this.host}:${this.port}`,
        }));
        this.client.connect();
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.client.get(key);
            return value;
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.set(key, value);
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.del(key);
        });
    }
}
exports.RedisConfig = RedisConfig;
