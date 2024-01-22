/**
 *
 */
import express, { Request, Response } from 'express';
import { sendEmailMessage } from '../utils/sendingMail.function';
import { BadRequestError, actionType } from 'brk-gcl-libary';

export const maillerRoutes = (router: express.Router) => {
  router.post('/sendmail/:email', async (req: Request, res: Response) => {
    const payload = req.body;

    try {
      await sendEmailMessage(actionType.SENDING_MAIL_ROUTES, {
        to: req.params.email,
        subject: payload.subject,
        message: payload.message,
      });
      res.status(200).send({ message: 'success' });
    } catch (error) {
      throw new BadRequestError('Someting went wrong');
    }
  });

  return router;
};
