import winston from 'winston';
export declare const customLevels: {
    levels: {
        http: number;
        trace: number;
        debug: number;
        info: number;
        warn: number;
        error: number;
        fatal: number;
    };
    colors: {
        http: string;
        trace: string;
        debug: string;
        info: string;
        warn: string;
        error: string;
        fatal: string;
    };
};
export declare const fileFormatter: winston.Logform.Format;
export declare const consoleFormatter: winston.Logform.Format;
export declare const requestConsoleFormatter: winston.Logform.Format;
