/**
 *
 */

import { BadRequestError, actionType, logger } from 'brk-gcl-libary';
import { transporter } from '../config/index.config';
import { genaretedHTMLfromTemplate } from './genaratedTemlate.function';

export interface payloadI {
  to: string;
  [key: string]: any;
}

export async function sendEmailMessage(action: actionType, payload: payloadI) {
  try {
    const html = await genaretedHTMLfromTemplate(action, payload);
    await transporter
      .sendMail({
        from: {
          name: 'BG',
          address: 'beta.burakguclu@gmail.com',
        },
        to: payload.to,
        subject: payload.subject,
        html,
      })
      .then(async () => {
        await logger.info({
          action: 'sending mail',
          message: `Sending mail ${payload.to} `,
        });
        return;
      });
  } catch (error) {
    throw new BadRequestError('Sending Message Error');
  }
}
