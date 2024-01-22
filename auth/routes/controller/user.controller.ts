/**
 *
 */
import { Request, Response, NextFunction } from 'express';
import { actionType, BadRequestError } from 'brk-gcl-libary';
import { User } from '../../model/user.model';
import jwt from 'jsonwebtoken';
import {  config, prodecur, redisCli } from '../../config/index.config';



interface TokenI {
  accessToken:string,
  refleshToken:string
}

export const UserOperations = {
    profile: async (req: Request, res: Response) => {
        res.status(200).json(req.user);
    },

    verifyTokenHandler: async (req: Request, res: Response) => {
        try {
            await User.findByIdAndUpdate(
                jwt.verify(req.params.token, process.env.JWT_KEY!),
                { 'email.verified': true }
            );

            res.status(200).send({ status: 'ok' });
        } catch (error) {
            throw new BadRequestError('Invalid token');
        }
    },

    sendVerifyMail: async (req: Request, res: Response) => {
        await User.findOne({ 'email.value': req.user!.email })
          .then(async (user) => {
              if (!user) throw new BadRequestError('user credantial error');
              const url = `${config.baseURL}/user/verify-token/${await jwt.sign(
                  user!.id,
                  process.env.JWT_KEY!
              )}`;

              await prodecur.publish(actionType.VERIFY, {
                  to: user?.email.value,
                  subject: 'EMAİL VERİFİCATİON',
                  token: url,
              });

              return res.status(200).send(req.user);
          })
          .catch((err) => {
              throw new BadRequestError('verify error');
          });
    },

    updateUser: async (req: Request, res: Response) => {
        const payload = req.body;
        await User.findByIdAndUpdate(req.user?.id, payload, { new: true })
            .then((user) => {
                if (payload['name.givenName'] || payload['name.familyName']) {
                    user?.save();
                }
                if (!user) throw new BadRequestError();

                res.status(202).send({ status: 'ok' });
            })
            .catch((error) => {
                throw new BadRequestError();
            });
    },

    deleteUser: async (req: Request, res: Response, next: NextFunction) => {
      await User.deleteOne({ _id: req.user?.id })
        .then((user) => {
          if (!user) {
            throw new BadRequestError();
          }
          req.logOut(function (err) {
            if (err) return next(err);
            return res.status(200).send({ status: 'ok' });
          });
        })
        .catch((error) => {
          throw new BadRequestError();
        });
    },

    singleUser: async (req: Request, res: Response) => {
      const _id = req.params.userId;
      await User.findById(_id)
        .then((user) => {
          if (!user) throw new BadRequestError();

          return res.status(200).send({
            id: user?.id,
            displayName: user?.displayName,
            email: user?.email,
            pictures: user?.picture,
          });
        })
        .catch((err) => {
          throw new BadRequestError();
        });
    },

    allUser: async (req: Request, res: Response) => {
      console.log('alluser controller çalışıyor');

      await User.find({}, '_id displayName email.value picture')
        .then((user) => {
          res.json(user);
        })
        .catch((err) => {
          throw new BadRequestError();
        });
    },
};
