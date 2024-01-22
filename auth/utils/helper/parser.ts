/**
 * 
 */
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { Profile as FacebookProfile } from 'passport-facebook';
import { UserAttrs } from '../../model/user.model';

export const parseProfileForUserAttrs = (profile: GoogleProfile | FacebookProfile, token:string): UserAttrs => {
    return {
        provider: profile.provider,
        name: {
            givenName: profile.name!.givenName,
            familyName: profile.name!.familyName,
        },
        email: {
            value: profile.emails![0].value,
            verified: true
        },
        token: token,
        picture: profile.photos![0].value
    };
};
