/**
 *
 */
import { actionType, EventListener } from 'brk-gcl-libary';
import { sendEmailMessage } from '../utils/sendingMail.function';
import { payloadI } from '../utils/sendingMail.function';

export const eventListener = async () => {
  const _consumer = new EventListener(process.env.RABBITMQ_URI!);

  await _consumer.listen(actionType.REGISTER, async (msg: payloadI) => {
    await sendEmailMessage(actionType.REGISTER, msg);
  });

  await _consumer.listen(actionType.VERIFY, async (msg: payloadI) => {
    await sendEmailMessage(actionType.VERIFY, msg);
  });

  await _consumer.listen(actionType.FORGOT_PASSWORD, async (msg: payloadI) => {
    await sendEmailMessage(actionType.FORGOT_PASSWORD, msg);
  });
};
