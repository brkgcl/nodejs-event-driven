export declare class EventPublisher {
    private connectionURI;
    constructor(connectionURI: string);
    publish(channelName: string, message: object): Promise<void>;
}
