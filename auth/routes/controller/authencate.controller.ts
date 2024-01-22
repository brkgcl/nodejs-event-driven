/**
 *
 */
import passport from 'passport';
import { config } from '../../config/index.config';

export const Authenticate = {
  google: passport.authenticate('google', { scope: ['profile', 'email'] }),

  googleCallback: passport.authenticate('google', {
    failureRedirect: config.failureRedirect,
    successRedirect: config.callbackSuccessRedirect,
  }),

  facebook: passport.authenticate('facebook', { scope: ['email'] }),

  facebookCallback: passport.authenticate('facebook', {
    successRedirect: config.callbackSuccessRedirect,
    failureRedirect: config.failureRedirect,
  }),

  register: passport.authenticate('register', {
    successRedirect: config.successRedirect,
    failureRedirect: config.failureRedirect,
    failureFlash: true,
  }),

  login: passport.authenticate('login', {
    successRedirect: config.successRedirect,
    failureRedirect: config.failureRedirect,
    failureFlash: true,
  }),
};
