/**
 * 
 */
import { Request,Response,NextFunction } from "express"
import { User } from "../../model/user.model";
import { BadRequestError, NotAuthorizedError, actionType } from "brk-gcl-libary";
import { accesTokenCookieOptions, config, prodecur, redisCli, refleshTokenCookieOptions } from "../../config/index.config";
import { Password } from "../../utils/helper/passwordHashing";
import jwt from 'jsonwebtoken';
import { AccessToken, RefleshToken } from "../../utils/token/genarate.token";

export const AuthOperations = {
    getAccessToken: async (req:Request, res:Response) => {
      const token = {
        accessToken: AccessToken.genarate(req.user!),
        refleshToken: RefleshToken.genarete(req.user!),
        permission: req.user?.verified,
      };
      await redisCli.set(req.user!.id!, JSON.stringify(token));
      
      res.cookie("access_token", token.accessToken, accesTokenCookieOptions);
      res.cookie(
        "reflesh_token",
        token.refleshToken,
        refleshTokenCookieOptions
      );
      res.cookie("logged_in", true, {
        ...accesTokenCookieOptions,
        httpOnly: false,
      });

      res.status(200).json(token.accessToken);
    },

    logOut: async (req:Request, res:Response, next:NextFunction) => {
      const userid = req.user?.id!;
      req.logOut(async function (err) {
        if (err) return next(err);
        await redisCli.delete(userid);
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });
        res.cookie("logged_in", "", { maxAge: 1 });
        return res.status(200).send({ status: "ok" });
      });
    },

    refleshToken:async (req:Request, res:Response) => {
        const refresh_token = req.cookies.reflesh_token as string;
        if(!(await RefleshToken.verify(refresh_token, req.user!)))
          throw new NotAuthorizedError('Reflesh token invalid');

        const accessToken = AccessToken.genarate(req.user!);
        
        res.cookie("access_token", accessToken, accesTokenCookieOptions);
        res.cookie("logged_in", true, {
          ...accesTokenCookieOptions,
          httpOnly: false,
        });

        res.status(200).send(accessToken);
    },

    sendForgotPasswordMail: async (req:Request, res:Response) => {
        const _email = req.body.email;
      await User.findOne({ 'email.value': _email })
        .then(async (user) => {
          if (!user) throw new BadRequestError('user yok aga')
          const url = `${
            config.baseURL
          }/user/forgot-password-token/${await jwt.sign(
            user.id,
            process.env.JWT_KEY!
          )}`;

          await prodecur.publish(actionType.FORGOT_PASSWORD, {
            to: _email,
            subject: 'FORGOT PASSWORD',
            token: url,
          });

          return res.status(200).send({ status: 'ok' });
        })
        .catch((error) => {
          throw new BadRequestError('user bulunamadı');
        });
    },

    changePassword: async (req:Request, res:Response) => {
         const id = await jwt.verify(req.body.token, process.env.JWT_KEY!);

         await User.findByIdAndUpdate(id, {
           token: await Password.toHash(req.body.password),
         })
           .then((user) => {
             if (!user) throw new BadRequestError();

             return res.status(200).send({ status: "ok" });
           })
           .catch((error) => {
             throw new BadRequestError();
           });
    }
}
