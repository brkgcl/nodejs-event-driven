/// <reference types="qs" />
import { Request, Response } from 'express';
export declare const morganMiddleware: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, callback: (err?: Error | undefined) => void) => void;
