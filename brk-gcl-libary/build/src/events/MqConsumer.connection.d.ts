import { actionType } from './type/action.type';
export declare class EventListener {
    private connectionURI;
    constructor(connectionURI: string);
    listen(channelName: actionType, callback: Function): Promise<void>;
}
