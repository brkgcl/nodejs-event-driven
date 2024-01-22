import { Strategy } from 'passport-google-oauth20';
import { User } from '../model/user.model';
import { BadRequestError, EventPublisher, actionType, logger } from 'brk-gcl-libary';
import { parseProfileForUserAttrs } from '../utils/helper/parser';

const prodecur = new EventPublisher(process.env.RABBITMQ_URI!);

export const GoogleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refleshToken, profile, done) => {
    
    await User.findOne({ 'email.value' : profile._json.email })
      .then(async (_user) => {
        if (_user) return done(null, _user);

        await User.CreateUser(parseProfileForUserAttrs(profile,accessToken)).then(
          (user) => {
            logger.info({
              action: 'user save successful',
              message: user.email.value,
            });

            prodecur.publish(actionType.REGISTER, {
              to: user.email.value,
              subject: 'WELCOME',
            });
            return done(null, user);
          }
        );
      })
      .catch((err) => {
        console.log(err);
        
        throw new BadRequestError('Someting went wrong');
      });
  }
);
