/**
 *
 */
import * as amqp from 'amqplib/callback_api';
import { actionType } from './type/action.type';

export class EventListener {
  private connectionURI: string;

  constructor(connectionURI: string) {
    this.connectionURI = connectionURI;
  }

  public async listen(channelName: actionType, callback: Function) {
    return await amqp.connect(
      this.connectionURI,
      (errorConnection, connect) => {
        if (errorConnection) throw errorConnection;

        connect.createChannel((errorChannel, channel) => {
          if (errorChannel) throw errorChannel;

          channel.assertQueue(channelName, { durable: true });
          channel.consume(
            channelName,
            (msg: amqp.Message | null) => {
              callback(JSON.parse(msg!.content.toString()) || null);
            },
            { noAck: true }
          );
        });
      }
    );
  }
}
