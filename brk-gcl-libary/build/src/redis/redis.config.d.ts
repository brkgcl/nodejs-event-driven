export declare class RedisConfig {
    private host;
    private port;
    private client;
    constructor(host: string, port: number, password?: string);
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
}
