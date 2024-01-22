/**
 *
 */
import { Router } from 'express';
import { UserOperations } from './controller/user.controller';
import { validationRequest } from 'brk-gcl-libary';
import { validationSchema } from '../validations/validation.shema';
import { authorizationMiddleware } from '../middleware/authorization.middleware';

export const userRouter = (router: Router) => {
    
    // @DSC authentication and authorozation middleware
    router.use(authorizationMiddleware);

    // @DSC user crud operation route
    router.get("/profile", UserOperations.profile);
    router.get("/get/:userId", UserOperations.singleUser);
    router.get("/get/all", UserOperations.allUser);
    router.post("/update",validationRequest(validationSchema.updateUser),UserOperations.updateUser);
    router.get("/delete", UserOperations.deleteUser);

    // @DSC email verification route
    router.get("/email/send-verify-mail", UserOperations.sendVerifyMail);
    router.get("/email/verify-email/:token", UserOperations.verifyTokenHandler);
    return router;
};
