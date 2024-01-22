import { Profile, Strategy } from "passport-facebook";
import { User } from "../model/user.model";
import { parseProfileForUserAttrs } from "../utils/helper/parser";
import { BadRequestError, logger } from "brk-gcl-libary";

export const FacebookStrategy = new Strategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID!,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    callbackURL: "/auth/facebook/callback",
    profileFields: ["id", "name", "displayName", "photos", "emails"],
    scope: ["email"],
  },
  async function (accessToken, refleshToken, profile, done) {
    
    await User.findOne({'email.value': profile._json.email})
        .then(async (user) => {
            if(user) return done(null, user);

            await User.CreateUser(
                parseProfileForUserAttrs(profile,accessToken)
            ).then((user) => {
                logger.info({
                    action: "user save successfull",
                    message:  user.email.value
                });

                return done(null, user);
            })
            .catch((err) => {throw new BadRequestError()});
    
        }).catch((err) => {throw new BadRequestError()});
  }
);