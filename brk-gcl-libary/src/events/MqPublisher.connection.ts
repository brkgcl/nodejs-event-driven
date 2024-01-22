/**
 *
 */
import * as amqp from 'amqplib/callback_api';
import { BadRequestError } from '../error/custom.error';
import { logger } from '../logger/logger.configuration';

export class EventPublisher {
  private connectionURI: string;
  //   private ch:any;

  constructor(connectionURI: string) {
    this.connectionURI = connectionURI;
  }

  public async publish(channelName: string, message: object) {
    return await amqp.connect(
      this.connectionURI,
      (errorConnection, connect) => {
        if (errorConnection) throw errorConnection;

        logger.info({
          action: 'rabbitmq',
          message: 'connection successfull',
        });

        connect.createChannel((errorChannel, channel) => {
          if (errorChannel) throw errorChannel;

          try {
            channel.sendToQueue(
              channelName,
              Buffer.from(JSON.stringify(message))
            );
          } catch (error) {
            throw new BadRequestError('publish error');
          }
        });
      }
    );
  }
}
