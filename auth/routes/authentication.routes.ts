/**
 *
 */
import express from 'express';
import { Authenticate } from './controller/authencate.controller';
import { validationSchema } from '../validations/validation.shema';
import { isAuthenticatedMiddleware, validationRequest } from 'brk-gcl-libary';
import { AuthOperations } from './controller/token.controller';

export const authenticationRouter = (router: express.Router) => {
    // @DSC multiple login authenticaon route
    router.get('/google', Authenticate.google);
    router.get('/google/callback', Authenticate.googleCallback);
    router.get('/facebook', Authenticate.facebook);
    router.get('/facebook/callback', Authenticate.facebookCallback);
    router.post('/local/login',validationRequest(validationSchema.login),Authenticate.login);
    router.post('/local/register',validationRequest(validationSchema.register),Authenticate.register);

    // @DSC logout authentication route
    router.get('/logout', isAuthenticatedMiddleware, AuthOperations.logOut);

    // @DSC authentication token operations route
    router.get('/get-access-token',isAuthenticatedMiddleware, AuthOperations.getAccessToken);
    router.get('/reflesh-token',isAuthenticatedMiddleware, AuthOperations.refleshToken);

    // @DSC forgot password route
    router.post("/forgat-password/",AuthOperations.sendForgotPasswordMail);
    router.post("/change-password/", AuthOperations.changePassword);

    return router;
};
