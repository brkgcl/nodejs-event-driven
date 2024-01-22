import { Request } from 'express';
import { Strategy as CustomStrategy } from 'passport-custom';
import { Strategy as LocalStrategy } from 'passport-local';
import { DoneCallback } from 'passport';
import { User, UserAttrs } from '../model/user.model';
import { BadRequestError, logger } from 'brk-gcl-libary';
import { Password } from '../utils/helper/passwordHashing';

export const LocalRegisterStrategy = new CustomStrategy(async function (
  req: Request,
  done: DoneCallback
) {
  const __user: UserAttrs = req.body;

  await User.findOne({ 'email.value': __user.email.value })
    .then(async (user) => {
      if (user)
        return done(new BadRequestError('User already registered'), false);
      const _user = await User.CreateUser(__user);

      return done(null, _user);
    })
    .catch((err) => {
      console.log('Error :', err);

      throw new BadRequestError('Someting went wrong');
    });
});

export const LocalLoginStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async function (email: string, password: string, done) {
    await User.findOne({ 'email.value': email })
      .then((user) => {
        if (!user) return done(new BadRequestError('User not found'), false);

        Password.toMatch(user!.token, password)
          .then((mathes) => {
            if (!mathes)
              return done(new BadRequestError('Missing Password'), false);

            logger.info({
              action: 'user login successfull',
              message: user.email.value,
            });
            return done(null, user);
          })
          .catch((err) => {
            throw new BadRequestError();
          });
      })
      .catch((err) => {
        throw new BadRequestError();
      });
  }
);
